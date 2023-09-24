import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MangaModule } from './manga/manga.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [ConfigModule.forRoot(), MangaModule, ChapterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
