import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { PostsService } from 'src/posts/posts.service';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = new this.categoryModel(createCategoryDto);
      await category.save();
      return category;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      // return the category with the posts
      return await this.categoryModel.findById(id).populate('posts');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      
      return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findByIdAndDelete(id);
      await this.postsService.removeCategoryFromAllPosts(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addPostToCategory(categoryId: string, postId: string) {
    try {
      return await this.categoryModel.findByIdAndUpdate(categoryId, { $push: { posts: postId } }, { new: true });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removePostFromCategory(categoryId: string, postId: string) {
    try {
      return await this.categoryModel.findByIdAndUpdate(categoryId, { $pull: { posts: postId } }, { new: true });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

}
