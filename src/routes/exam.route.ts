import { Router } from 'express';
import { ExamController } from '@controllers/exam.controller';
import { CreateExamDto } from '@dtos/exam.dto';
import { CreateNext_ExamDto } from '@dtos/next-exam.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

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
    this.router.post(`${this.path}`, ValidationMiddleware(CreateExamDto, 'body'), this.exam.createExam);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateExamDto, 'body', true), this.exam.updateExam);
    this.router.delete(`${this.path}/:id(\\d+)`, this.exam.deleteExam);

    this.router.post(`${this.path}/set-next-exam`, ValidationMiddleware(CreateNext_ExamDto, 'body'), this.exam.setNextExamData);
    this.router.get(`${this.path}/up-coming/:id`, this.exam.getUpcomingExams);
  }
}
