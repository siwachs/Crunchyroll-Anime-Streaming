import { promises as fs } from 'fs';
import { join } from 'path';
import * as mime from 'mime-types';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { File } from 'src/common/types';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabaseBucketName: string;
  private supabase: SupabaseClient;

  onModuleInit() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
    const SUPABASE_BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !SUPABASE_BUCKET_NAME)
      throw new Error(
        'Supabase URL, Service Key, and Bucket Name are required!',
      );

    this.supabaseBucketName = SUPABASE_BUCKET_NAME;
    this.supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  }

  private getStorage() {
    return this.supabase.storage.from(this.supabaseBucketName);
  }

  private async retryUpload(
    uploadFn: Function,
    retries: number = 5,
    delay: number = 1000,
  ) {
    let attempts = 0;

    while (attempts < retries) {
      try {
        return await uploadFn();
      } catch (error) {
        attempts++;
        console.log(`Upload Failed, retrying in ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;

        if (attempts >= retries) {
          console.error('Max retries reached. Upload failed.');
          throw error;
        }
      }
    }
  }

  async uploadFiles(
    files: File[],
    storageRef: string,
  ): Promise<Record<string, string>> {
    const storage = this.getStorage();
    const uploadedFilesUrls: Record<string, string> = {};

    for (const file of files) {
      try {
        const filePath = `${storageRef}/${file.originalname}`;
        const contentType = file.mimetype;

        await this.retryUpload(async () => {
          const { error } = await storage.upload(filePath, file.buffer, {
            cacheControl: '3600',
            upsert: true,
            contentType,
          });

          if (error) {
            console.error(`Error uploading file: ${file.originalname}`, error);
            throw error;
          }
        });

        const { data: publicData } = storage.getPublicUrl(filePath);
        const publicURL = publicData.publicUrl;

        uploadedFilesUrls[file.originalname] = publicURL;
      } catch (error) {
        console.log(`Error while uploading file: ${file.originalname}`);
        throw error;
      }
    }

    return uploadedFilesUrls;
  }

  async uploadDir(
    dirPath: string,
    storageRef: string,
    maxConcurrentUploads: number = 3,
  ) {
    const storage = this.getStorage();

    try {
      const files = await fs.readdir(dirPath);

      const uploadFile = async (fileName: string) => {
        const filePath = join(dirPath, fileName);
        const contentType = mime.lookup(filePath) || undefined;

        await this.retryUpload(async () => {
          const { error } = await storage.upload(
            `${storageRef}/${fileName}`,
            await fs.readFile(filePath),
            { cacheControl: '3600', upsert: true, contentType },
          );

          if (error) {
            console.error(`Error uploading file: ${fileName}`, error);
            throw error;
          }
        });
      };

      // Process Files in Batch
      const queue = [...files];
      const activeUploads: Promise<void>[] = [];

      while (queue.length > 0) {
        if (activeUploads.length < maxConcurrentUploads) {
          const fileName = queue.shift();
          const uploadPromise = uploadFile(fileName);

          activeUploads.push(uploadPromise);

          uploadPromise.finally(() => {
            const activeUploadIndex = activeUploads.indexOf(uploadPromise);
            if (activeUploadIndex !== -1)
              activeUploads.splice(activeUploadIndex, 1);
          });
        }

        if (activeUploads.length >= maxConcurrentUploads)
          await Promise.race(activeUploads);
      }

      await Promise.all(activeUploads);
    } catch (error) {
      console.error(`Error while uploading directory: ${dirPath}`);
      throw error;
    }

    return `https://supabase.io/storage/v1/object/public/${storageRef}`;
  }
}
