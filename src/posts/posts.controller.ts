import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() request: Request ) {
    // console.log(request);
    const userId = request['user']._id;
    // console.log(userId);
    return this.postsService.create(userId,createPostDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') postId: string) {
    return this.postsService.findOne(postId);
  }

  @Patch(':id')
  async update(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto,@Req() request: Request) {
    const userId = request['user']._id;
    return this.postsService.update(postId , userId , updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') postId: string,@Req() request: Request) {
    const userId = request['user']._id;
    return this.postsService.remove( postId, userId);
  }
  
}
