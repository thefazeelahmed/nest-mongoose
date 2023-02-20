import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { deleteOne, getAll } from 'common/helper/handlerFactory';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll(req, res) {
    getAll(this.userModel, req, res, {});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: string, response) {
    try {
      const data = await deleteOne(this.userModel, id, response);
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}
