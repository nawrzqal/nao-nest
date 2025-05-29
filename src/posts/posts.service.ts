import { BadRequestException, Injectable, ContextType, Inject, NotFoundException, ForbiddenException, forwardRef} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { Post, PostDocument } from './entities/post.entity';
import { Model,Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { CommentsService } from 'src/comments/comments.service';
@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => CategoriesService))
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => CommentsService))
    private readonly commentService: CommentsService,
    @InjectModel(Post.name) private postModel: Model<PostDocument>
  ) {}
  
  async create(userId:string , createPostDto: CreatePostDto) {
    const creator = await this.usersService.findOne(userId);
    
    try {
      const post = new this.postModel({
        ...createPostDto,
        creator: creator._id,
      });

      const newPost = await post.save();

      if(createPostDto.category){
        const addPostToCategory = await this.categoriesService.addPostToCategory(createPostDto.category, newPost._id.toString());
      }
      // Handle the case where posts could be null or undefined
      const existingPosts = creator.posts || [];      

      await this.usersService.update( userId, {posts: [...existingPosts, newPost._id]});
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

  async findAll() {
    try {
      return this.postModel.find().exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
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

      let updatedPosts: Types.ObjectId[] = [];
      if(user.posts && user.posts.length > 0){
        // Filter out the deleted post from user's posts array
        updatedPosts = user.posts.filter(
          post => post.toString() !== postId
        );
      }

      if(post.category ){
        const removePostFromCategory = await this.categoriesService.removePostFromCategory(post.category.toString(), postId);
      }

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

  async removeCategoryFromAllPosts(categoryId: string) {
    try {
      const posts = await this.postModel.find({ category: categoryId }).exec();
      for (const post of posts) {
        post.category = null; // Set to null instead of undefined
        await post.save();
      }
      return { message: 'Category removed from all posts' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addCommentToPost(postId: string, commentId: string) {
    try {
      const post = await this.postModel.findById(postId);
      if (!post) throw new NotFoundException('Post not found');

      post.comments.push(new Types.ObjectId(commentId));
      await post.save();

      return post;

    }catch(error){
      throw new BadRequestException(error);
    }
  }

  
}
