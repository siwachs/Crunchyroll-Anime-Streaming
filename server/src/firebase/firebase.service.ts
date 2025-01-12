import { Injectable, OnModuleInit } from '@nestjs/common';

import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const GOOGLE_APIS_ENDPOINT = 'https://storage.googleapis.com';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY;
    if (!serviceAccount)
      throw new Error('Firbase service account private key is missing!');

    if (!getApps().length) {
      const serviceAccountObject = JSON.parse(serviceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountObject),
      });
    }
  }

  private getStorageBucket() {
    return admin.storage().bucket();
  }

  async uploadFiles(
    files: Express.Multer.File[],
    storageRef: string,
  ): Promise<string[]> {
    const bucket = this.getStorageBucket();
    const uploadedFilesUrls: string[] = [];

    for (const file of files) {
      try {
        const fileName = `${storageRef}/${file.originalname}`;
        const fileUpload = bucket.file(fileName);

        await fileUpload.save(file.buffer, {
          metadata: { contentType: file.mimetype },
        });
        await fileUpload.makePublic();

        const publicURL = `${GOOGLE_APIS_ENDPOINT}/${bucket.name}/${fileName}`;
        uploadedFilesUrls.push(publicURL);
      } catch (error) {
        console.log(`Error while uploading file: ${file.fieldname}`);
        throw error;
      }
    }

    return uploadedFilesUrls;
  }
}
