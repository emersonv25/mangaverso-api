import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class ChapterDto {
    @ApiProperty({
        description: 'The chapter number',
        example: '1'
    })
    @IsNotEmpty()
    chapterNumber: string

    @ApiProperty({
        description: 'List of chapter pages',
        type: () => [ChapterPageDto]
    })
    chapterPages : ChapterPageDto []
}

export class ChapterPageDto {
    @ApiProperty({
        description: 'Image Url of the Chapter',
        example: 'https://img.lermanga.org/O/one-piece-colorido/capitulo-01/1.png'
    })
    @IsNotEmpty()
    imageUrl: string

    @ApiProperty({
        description: 'Number position of the page',
        example : 1
    })
    @IsNotEmpty()
    pageNumber: number
}