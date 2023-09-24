import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChapterService } from './chapter.service';
import { ChapterDto } from 'src/chapter/dto/chapter.dto';

@ApiTags('Chapter')
@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService){}

    @Get(':mangaId')
    @ApiOperation({ summary: `Endpoint to get all chapters of one manga.`, })
    @ApiResponse({ status: 200, description: 'Success.' })
    async getAllChaptersOfManga(@Param('mangaId') mangaId:number):Promise<any>{
         return await  this.chapterService.getAllChaptersOfManga(mangaId)
    }

    @Get('/pages/:chapterId')
    @ApiOperation({ summary: `Endpoint to get chapter pages.`, })
    @ApiResponse({ status: 200, description: 'Success.' })
    async getChapterPages(@Param('chapterId') chapterId:number):Promise<any>{
         return await  this.chapterService.getChapterPages(chapterId)
    }


    @Post()
    @ApiOperation({ summary: `Endpoint to post one chapter.`, })
    @ApiResponse({ status: 200, description: 'Success.' })
    async postChapter(@Param('mangaId') mangaId: number, @Body() postData: ChapterDto):Promise<any>{
         return this.chapterService.createChapter(mangaId, postData)
    }

}
