import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateExamDto } from '@dtos/exam.dto';
import { Exam } from '@interfaces/exam.interface';
import { ExamService } from '@services/exam.service';

export class ExamController {
  private exam = Container.get(ExamService);

  public createExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const examData: CreateExamDto = req.body;
      const createExamData: Exam = await this.exam.createExam(examData);

      res.status(201).json({ data: createExamData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const examId = Number(req.params.id);
      const examData: CreateExamDto = req.body;
      const updatedExamData: Exam = await this.exam.updateExam(examId, examData);

      res.status(200).json({ data: updatedExamData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const examId = Number(req.params.id);
      const deleteExamData: Exam = await this.exam.deleteExam(examId);

      res.status(200).json({ data: deleteExamData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
