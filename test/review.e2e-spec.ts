import { CreateUserDto } from './../src/users/dtos/create.user.dto';
import { CreateReviewDto } from './../src/review/dtos/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const productId = new Types.ObjectId().toHexString();

const signinDto: CreateUserDto = {
  email: 'test@.com',
  password: '1',
};

const testDto: CreateReviewDto = {
  name: 'Name',
  title: 'Title',
  description: 'Description',
  rating: 5,
  productId,
};

describe('Review Controller (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(signinDto);
    token = body.access_token;
  });

  it('/review (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review')
      .send({ ...testDto, rating: 0 })
      .expect(400);
  });

  it('/review/:prodId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/review/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThanOrEqual(1);
      });
  });

  it('/review/:prodId (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get('/review/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .set('Authorization', 'Bearer ' + token)
      .then(() => {
        expect(200);
      });
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .then(() => {
        expect(404);
      });
  });

  afterAll(() => {
    disconnect();
  });
});
