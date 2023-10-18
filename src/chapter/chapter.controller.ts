import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChapterService } from './chapter.service';
import { ChapterDto, ChapterPageResponseDto, ChapterResponseDto } from './dto/chapter.dto';

@ApiTags('Chapter')
@Controller('chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService){}

    @Get('/pages/:chapterId')
    @ApiOperation({ summary: `Endpoint to get all pages of a chapter.`, })
    @ApiResponse({ status: 200, type: [ChapterPageResponseDto] ,description: 'Success.' })
    async getChapterPages(@Param('chapterId') chapterId:number):Promise<ChapterPageResponseDto[]>{
         return await  this.chapterService.getChapterPages(chapterId)
    }


    @Post()
    @ApiOperation({ summary: `Endpoint to post one chapter.`, })
    @ApiResponse({ status: 200, type: ChapterResponseDto ,description: 'Success.' })
    async postChapter(@Query('mangaId') mangaId: number, @Body() postData: ChapterDto):Promise<ChapterResponseDto>{
         return this.chapterService.createChapter(mangaId, postData)
    }

}
