import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {

  let app: INestApplication;
  const map1Path: string = `${__dirname}/dataset/map1.txt`;
  const map2Path: string = `${__dirname}/dataset/map2.txt`;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
  });

  it('/upload (POST)', () => {
      const fs = require('mz/fs');

      jest.useFakeTimers();

    fs.exists(map1Path)
        .then((exists) => {
          if (!exists) throw new Error('file does not exist');

          return request(app.getHttpServer())
              .post('/upload')
              .set('Content-Type', 'multipart/form-data')
              .attach('file', './test/dataset/map1.txt')
              .expect(201)
              .expect(
                  'C - 3 - 4\n' +
                  'M - 1 - 0\n' +
                  'M - 2 - 1\n' +
                  'T - 0 - 3 - 0\n' +
                  'T - 1 - 3 - 0\n' +
                  'A - LARA - 0 - 3 - 2'
              );
        });
  });
});
