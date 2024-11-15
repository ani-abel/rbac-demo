import { UseGuards, Get, Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RbacGuard } from '../rbac/rbac.guard';
import { AuthGuard } from '../rbac/auth.guard';
import { CheckAbilities } from '../rbac/ability.decorator';
import { Actions, FeatureGroups, Features } from 'src/utils/util.constant';

@Controller('user')
export class UserController {
  constructor(private readonly userSrv: UserService) {}

  @Post('/login')
  async login(
    @Body() payload: { email: string; password: string },
  ): Promise<{ token: string }> {
    return await this.userSrv.login(payload);
  }

  @CheckAbilities({
    action: Actions.APPROVE,
    feature: Features.CARD_REQUEST,
    featureGroup: FeatureGroups.MAINTENANCE_REQUEST,
  })
  @UseGuards(AuthGuard, RbacGuard)
  @Get()
  async findUsers() { 
    return await this.userSrv.findUsers();
  }
}
