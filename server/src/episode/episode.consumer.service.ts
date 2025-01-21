import { Injectable } from '@nestjs/common';

import { DataProcessingService } from 'src/data-processing/data-processing.service';
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
    private readonly dataProcessingService: DataProcessingService,
    @InjectModel(Episode.name) private readonly episodeModel: Model<Episode>,
    private readonly firebaseService: FirebaseService,
    private readonly hlsSerive: HlsService,
  ) {}

  async uploadEpisodeThumbnail(message: {
    seriesId: string;
    seasonId: string;
    episodeId: string;
    file: File;
  }) {
    const { seriesId, seasonId, episodeId, file } = message;

    const bufferFile =
      this.dataProcessingService.base64StringToFileBuffer(file);

    const uploadedFilesURLs = await this.firebaseService.uploadFiles(
      [bufferFile],
      `${SERIES_BASE_STORAGE_REF}/${seriesId}/Seasons/${seasonId}/${episodeId}`,
    );

    const { thumbnail } = uploadedFilesURLs;

    await this.episodeModel.findByIdAndUpdate(episodeId, { thumbnail }).exec();
  }

  async transcodeUploadedMediaToHLS(message: {
    seriesId: string;
    seasonId: string;
    episodeId: string;
    mediaPath: string;
  }) {
    const { seriesId, seasonId, episodeId, mediaPath } = message;
    await this.hlsSerive.transcodeToHLS(mediaPath);
  }
}
