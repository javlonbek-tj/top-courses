import { UserDocument, User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ email, password });

    return newUser.save();
  }

  findOne(id: string): Promise<User | null> {
    if (!id) {
      return null;
    }
    return this.userModel.findById(id).exec();
  }

  find(email: string): Promise<User[]> {
    return this.userModel.find({ email }).exec();
  }

  update(id: string, attrs: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, attrs, { new: true });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}