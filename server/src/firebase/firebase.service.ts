import { promises as fs } from 'fs';
import { join } from 'path';
import * as mime from 'mime-types';
import { Injectable, OnModuleInit } from '@nestjs/common';

import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

import { File } from 'src/common/types';
const GOOGLE_APIS_ENDPOINT = 'https://storage.googleapis.com';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const storageBucket = process.env.FIREBASE_BUCKET_NAME;

    if (!serviceAccount || !storageBucket)
      throw new Error(
        'Firbase service account and storage bucket is required!',
      );

    if (!getApps().length) {
      const serviceAccountObject = JSON.parse(serviceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountObject),
        storageBucket,
      });
    }
  }

  private getStorageBucket() {
    return admin.storage().bucket();
  }

  async uploadFiles(
    files: File[],
    storageRef: string,
  ): Promise<Record<string, string>> {
    const bucket = this.getStorageBucket();
    const uploadedFilesUrls = {};

    for (const file of files) {
      try {
        const fileName = `${storageRef}/${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        await fileUpload.save(file.buffer, {
          metadata: { contentType: file.mimetype },
        });
        await fileUpload.makePublic();

        const publicURL = `${GOOGLE_APIS_ENDPOINT}/${bucket.name}/${fileName}`;
        uploadedFilesUrls[file.originalname] = publicURL;
      } catch (error) {
        console.log(`Error while uploading file: ${file.fieldname}`);
        throw error;
      }
    }

    return uploadedFilesUrls;
  }

  async uploadDir(dirPath: string, storageRef: string) {
    const bucket = this.getStorageBucket();

    try {
      const files = await fs.readdir(dirPath);

      for (const fileName of files) {
        const filePath = join(dirPath, fileName);
        const fileUpload = bucket.file(`${storageRef}/${fileName}`);
        const contentType = mime.lookup(filePath) || undefined;

        await fileUpload.save(await fs.readFile(filePath), {
          metadata: { contentType },
        });
        await fileUpload.makePublic();
      }
    } catch (error) {
      console.error(`Error while uploading directory: ${dirPath}`);
      throw error;
    }

    return `${GOOGLE_APIS_ENDPOINT}/${bucket.name}/${storageRef}/master.m3u8`;
  }
}
