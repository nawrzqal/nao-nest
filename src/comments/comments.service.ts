import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PostsService } from 'src/posts/posts.service';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}



  async create(userId: string, postId: string, createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.commentModel.create({
        ...createCommentDto,
        creator: userId,
        post: postId,
      });
      await this.postsService.addCommentToPost(postId,comment._id.toString());
      
    }catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
