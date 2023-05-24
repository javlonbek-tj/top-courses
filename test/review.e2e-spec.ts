import { CreateReviewDto } from './../src/review/dtos/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const productId = new Types.ObjectId().toHexString();

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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
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
      .then(() => {
        expect(200);
      });
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .then(() => {
        expect(404);
      });
  });

  afterAll(() => {
    disconnect();
  });
});
