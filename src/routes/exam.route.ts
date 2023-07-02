import { Router } from 'express';
import { ExamController } from '@controllers/exam.controller';
import { CreateExamDto } from '@dtos/exam.dto';
import { CreateNext_ExamDto } from '@dtos/next-exam.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminMiddleware } from '@middlewares/admin.middleware';
import { UserMiddleware } from '@middlewares/user.middleware';

export class ExamRoute implements Routes {
  public path = '/exams';
  public router = Router();
  public exam = new ExamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.exam.getAllExams);
    this.router.get(`${this.path}/:id`, this.exam.getAllTopicsOfAExam);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateExamDto, 'body'),UserMiddleware, this.exam.createExam);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateExamDto, 'body', true),AdminMiddleware, this.exam.updateExam);
    this.router.delete(`${this.path}/:id(\\d+)`,AdminMiddleware, this.exam.deleteExam);

    this.router.post(`${this.path}/set-next-exam`, ValidationMiddleware(CreateNext_ExamDto, 'body'), this.exam.setNextExamData);
    this.router.get(`${this.path}/up-coming/:id`, this.exam.getUpcomingExams);
  }
}
