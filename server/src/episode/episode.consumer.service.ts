import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';

import { ValidatorAndDataProcessingService } from 'src/validator-and-data-processing/validator-and-data-processing.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { HlsService } from 'src/hls/hls.service';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Episode } from './schemas/episode.schema';

import { File } from 'src/common/types';
import { SERIES_BASE_STORAGE_REF } from 'src/common/constants/firebase';

@Injectable()
export class EpisodeConsumerService {
  constructor(
    private readonly validatorAndDataProcessingService: ValidatorAndDataProcessingService,
    @InjectModel(Episode.name) private readonly episodeModel: Model<Episode>,
    private readonly firebaseService: FirebaseService,
    private readonly hlsSerive: HlsService,
  ) {}

  async uploadThumbnail(message: {
    seriesId: string;
    seasonId: string;
    episodeId: string;
    file: File;
  }) {
    const { seriesId, seasonId, episodeId, file } = message;

    const bufferFile =
      this.validatorAndDataProcessingService.base64StringToFileBuffer(file);

    const uploadedFilesURLs = await this.firebaseService.uploadFiles(
      [bufferFile],
      `${SERIES_BASE_STORAGE_REF}/${seriesId}/Seasons/${seasonId}/${episodeId}`,
    );

    const { thumbnail } = uploadedFilesURLs;

    this.episodeModel.findByIdAndUpdate(episodeId, { thumbnail }).exec();
  }

  transcodeUploadedMediaToHLS(message: {
    seriesId: string;
    seasonId: string;
    episodeId: string;
    mediaPath: string;
  }) {
    const { seriesId, seasonId, episodeId, mediaPath } = message;

    this.hlsSerive.transcodeToHLS(seriesId, seasonId, episodeId, mediaPath);
  }

  async uploadTranscodedMedia(message: {
    masterFileDir: string;
    masterFileName: string;
    seriesId: string;
    seasonId: string;
    episodeId: string;
    transcodedMediaDir: string;
  }) {
    const {
      masterFileDir,
      masterFileName,
      seriesId,
      seasonId,
      episodeId,
      transcodedMediaDir,
    } = message;

    const uploadedMediaDirURL = await this.firebaseService.uploadDir(
      transcodedMediaDir,
      `${SERIES_BASE_STORAGE_REF}/${seriesId}/Seasons/${seasonId}/${episodeId}/media`,
    );

    await this.episodeModel
      .findByIdAndUpdate(episodeId, {
        media: `${uploadedMediaDirURL}/master.m3u8`,
      })
      .exec();

    console.log(`${masterFileName} is uploaded`);

    await fs.rm(masterFileDir, { recursive: true, force: true });
  }
}
