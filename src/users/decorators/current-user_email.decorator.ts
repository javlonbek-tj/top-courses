import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUserEmail = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
