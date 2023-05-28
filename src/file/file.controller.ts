import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element-response';
import { FileService } from './file.service';
import { Mfile } from './mfile.class';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveArray: Mfile[] = [new Mfile(file)];
    if (file.mimetype.includes('image')) {
      const buffer = await this.fileService.convertToWebP(file.buffer);
      saveArray.push(
        new Mfile({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer,
        }),
      );
    }
    return this.fileService.saveFiles(saveArray);
  }
}
