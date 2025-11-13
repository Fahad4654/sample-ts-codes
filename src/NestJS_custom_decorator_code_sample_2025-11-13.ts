import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

// Usage in controller

import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  @Get()
  getProfile(@User() user: any) {
    return { ...user, message: 'Profile fetched successfully' };
  }

  @Get('email')
  getEmail(@User('email') email: string) {
    return { email };
  }
}