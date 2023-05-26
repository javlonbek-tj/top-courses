import { CreateUserDto } from './../src/users/dtos/create.user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';

const signinDto: CreateUserDto = {
  email: 'test2@gmail.com',
  password: '1234',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signin (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(signinDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/signin (POST) - fail user', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ ...signinDto, email: 'aaa@a.ru' })
      .expect(401, {
        statusCode: 401,
        message: 'User not Found',
        error: 'Unauthorized',
      });
  });

  it('/auth/signin (POST) - fail password', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ ...signinDto, password: '2' })
      .expect(401, {
        statusCode: 401,
        message: 'Invalid password',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
