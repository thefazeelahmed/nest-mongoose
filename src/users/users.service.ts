import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { deleteOne, getAll, updateOne } from 'common/helper/handlerFactory';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll(query, res) {
    getAll(this.userModel, query, res, {});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: string, updateUserDto: UpdateUserDto, res) {
    updateOne(this.userModel, id, updateUserDto, res);
  }

  async remove(id: string, response) {
    try {
      const data = await deleteOne(this.userModel, id, response);
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}
