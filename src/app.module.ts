import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MangaModule } from './manga/manga.module';

@Module({
  imports: [ConfigModule.forRoot(), MangaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
