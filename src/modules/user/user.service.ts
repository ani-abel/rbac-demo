import {
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Users } from '../../entities/user.entity';
import { GenericService } from '../../services/generic.service';

@Injectable()
export class UserService extends GenericService(Users) implements OnModuleInit {
  async onModuleInit() {
    const roleId = '54407224-296e-41f7-9d78-d069d2676994';
    const userList: Partial<Users>[] = [
      {
        name: 'Jerome Houston',
        email: 'jerome@houston.com',
        password: '123456',
        roleId,
      },
    ];
    for (const user of userList) {
      const userExists = await this.findOne({
        email: user.email,
        name: user.name,
      });
      if (!userExists?.id) {
        const newUser = await this.create<Partial<Users>>(user);
        console.log({ newUser });
      }
    }
  }

  async login(payload: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    try {
      const user = await this.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (!user?.id) {
        throw new NotFoundException('User not found');
      }
      const { id, email, dateCreated, roleId } = user;
      const payloadToSign = JSON.stringify({
        user,
        dateCreated,
        email,
        roleId,
        id,
      });
      const token = this.signPayload({ data: payloadToSign });
      return { token };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async findUsers() {
    return await this.findAll();
  }

  private signPayload<T>(payload: T): string {
    const secret = process.env.JWT_SECRET;
    const expiration = process.env.JWT_EXPIRATION;
    return sign(payload, secret, {
      expiresIn: expiration ?? '1d',
    });
  }
}
