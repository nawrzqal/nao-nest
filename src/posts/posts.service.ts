import { BadRequestException, Injectable, ContextType, Inject, NotFoundException, ForbiddenException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { Post, PostDocument } from './entities/post.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Post.name) private postModel: Model<PostDocument>
  ) {}
  
  async create(userid:string , createPostDto: CreatePostDto) {
    const creator = await this.usersService.findOne(userid);
    
    try {
      const post = new this.postModel({
        ...createPostDto,
        creator: creator._id,
      });

      const newPost = await post.save();
      await this.usersService.update( userid, {posts: [...creator.posts, newPost._id]});
      return newPost;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(postId: string,userId:string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postModel.findById(postId);
      if(!post) throw new NotFoundException('Post not found');
      if( post.creator.toString() !== userId) 
        throw new ForbiddenException('You are not allowed to update this post');

      return this.postModel.findByIdAndUpdate(postId, updatePostDto, {new: true});

    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    try {
      return this.postModel.find().exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: string) {
    try {
      return this.postModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(postId: string, userId: string) {

    try{

      const post = await this.postModel.findById(postId);
      if(!post) throw new NotFoundException('Post not found');
      if( post.creator.toString() !== userId) 
        throw new ForbiddenException('You are not allowed to delete this post');

      // Get the user and their current posts
      const user = await this.usersService.findOne(userId);
      
      // Filter out the deleted post from user's posts array
      const updatedPosts = user.posts.filter(
        post => post.toString() !== postId
      );

      // Delete the post and update the user's posts array
      await Promise.all([
        this.postModel.findByIdAndDelete(postId),
        this.usersService.update(userId, { posts: updatedPosts })
      ]);

      return { message: 'Post deleted successfully' };

    }catch(error){
      throw new BadRequestException(error);
    }
  }
}
