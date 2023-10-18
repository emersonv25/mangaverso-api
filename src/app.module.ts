import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MangaModule } from './manga/manga.module';
import { ChapterModule } from './chapter/chapter.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), MangaModule, ChapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
