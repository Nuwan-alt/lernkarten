import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateExamDto } from '@dtos/exam.dto';
import { CreateNext_ExamDto } from '@dtos/next-exam.dto';
import { Exam } from '@interfaces/exam.interface';
import { ExamService } from '@services/exam.service';
import { Topic } from '@/interfaces/topic.interface';
import { Next_Exam } from '@/interfaces/next-exam.interface';

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

  public getAllExams = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const allExamData: Exam[] = await this.exam.getAllExams();

      res.status(200).json({ exams: allExamData});
    } catch (error) {
      next(error);
    }
  };

  public getAllTopicsOfAExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const examId = Number(req.params.id);
      const allTopicData: Topic[] = await this.exam.getAllTopicsOfAExam(examId)

      res.status(200).json({ topics_for_the_exam: allTopicData});
    } catch (error) {
      next(error);
    }
  };

  public setNextExamData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const next_exam_data:CreateNext_ExamDto = req.body;
      const allTopicData: Next_Exam = await this.exam.setNextExamDate(next_exam_data);
      res.status(201).json({ data: next_exam_data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public getUpcomingExams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const upcomingExams: Next_Exam[] = await this.exam.getUpComingExamsForUser(userId)
      res.status(200).json({ upComing_exams: upcomingExams });
    } catch (error) {
      next(error);
    }
  };
}
