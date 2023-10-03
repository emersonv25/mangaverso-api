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

export class ChapterResponseDto {

    @ApiProperty({
        description: 'Id of Chapter',
        example: 123
    })
    id : number

    @ApiProperty({
        description: 'Manga Id of Chapter',
        example: 123
    })
    mangaId : number

    @ApiProperty({
        description: 'Created',
        example: '2023-10-02T13:02:02.735Z'
    })
    createdAt : Date

    @ApiProperty({
        description: 'Modified',
        example: '2023-10-02T13:02:02.735Z'
    })
    modifiedAt : Date

    @ApiProperty({
        description: 'The chapter number',
        example: '1'
    })
    chapterNumber: string

    @ApiProperty({
        description: 'List of chapter pages',
        type: () => [ChapterPageResponseDto]
    })
    chapterPages? : ChapterPageResponseDto []
}

export class ChapterPageResponseDto {
    @ApiProperty({
        description: 'Id of Page',
        example: 123
    })
    id : number

    @ApiProperty({
        description: 'Chapter Id of Page',
        example: 123
    })
    chapterId : number
    
    @ApiProperty({
        description: 'Created',
        example: '2023-10-02T13:02:02.735Z'
    })
    createdAt : Date

    @ApiProperty({
        description: 'Modified',
        example: '2023-10-02T13:02:02.735Z'
    })
    modifiedAt : Date
    
    @ApiProperty({
        description: 'Image Url of the Chapter',
        example: 'https://img.lermanga.org/O/one-piece-colorido/capitulo-01/1.png'
    })

    imageUrl: string

    @ApiProperty({
        description: 'Number position of the page',
        example : 1
    })
    pageNumber: number
}