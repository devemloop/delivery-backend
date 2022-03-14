import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/post-user.dto';
import { TenantService } from '@modules/public/tenant/tenant.service';

@Injectable()
export class UserService {
  constructor(
    private tenantService: TenantService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUserById(id: string) {
    return this.userRepository.findOne(id);
  }

  async postUser(body: UserDto) {
    const [oldUser] = await this.userRepository.find({
      where: {
        username: body.username,
      },
    });

    if (oldUser) {
      throw new BadRequestException('Usuário já utilizado');
    }

    const tenant = await this.tenantService.getTenantById(body.tenantId);

    if (!tenant) {
      throw new BadRequestException('O tenant informado não foi encontrado');
    }

    body.password = await bcrypt.hash(body.password, await bcrypt.genSalt());

    const user = await this.userRepository.save({
      ...body,
      tenant,
    });

    delete user.password;
    return user;
  }
}
