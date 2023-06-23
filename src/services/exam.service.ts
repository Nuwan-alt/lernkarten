import { Service } from 'typedi';
import { DB } from '@database';
import { CreateExamDto } from '@dtos/exam.dto';
import { CreateNext_ExamDto } from '@dtos/next-exam.dto';
import { HttpException } from '@/exceptions/httpException';
import { Exam } from '@interfaces/exam.interface';
import { Next_Exam } from '@/interfaces/next-exam.interface';

@Service()
export class ExamService {


  public async createExam(examData: CreateExamDto): Promise<Exam> {
    const findExam: Exam = await DB.Exams.findOne({ where: { title: examData.title } });
    if (findExam) throw new HttpException(409, `This exam ${examData.title} already exists`);

    const createExamData: Exam = await DB.Exams.create(examData);
    return createExamData;
  }

  public async updateExam(examId: number, examData: CreateExamDto): Promise<Exam> {
    const findExam: Exam = await DB.Exams.findByPk(examId);
    if (!findExam) throw new HttpException(409, "Exam doesn't exist");

    await DB.Exams.update(examData, { where: { id: examId } });

    const updateExam: Exam = await DB.Exams.findByPk(examId);
    return updateExam;
  }

  public async deleteExam(examId: number): Promise<Exam> {
    const findExam: Exam = await DB.Exams.findByPk(examId);
    if (!findExam) throw new HttpException(409, "Exam doesn't exist");

    await DB.Exams.destroy({ where: { id: examId } });

    return findExam;
  }

  public async getAllExams(): Promise<Exam[]> {
    
    const allExams: Exam[] = await DB.Exams.findAll({attributes:['id','title']});
    if (!allExams) throw new HttpException(409, "Exams not found");
    return allExams;
  }

  public async getAllTopicsOfAExam(examId:number): Promise<Topic[]> {
    
    const allTopics: Topic[] = await DB.Topics.findAll({where:{exam_id:examId},attributes:['id','title']});
    if (!allTopics) throw new HttpException(409, "Topics not found");

    return allTopics;
  }

  
  public async setNextExamDate(nextExam: CreateNext_ExamDto): Promise<Next_Exam> {
    const findNext_Exam: Next_Exam = await DB.Next_Exam.findOne({where:{user_id:nextExam.user_id, exam_id:nextExam.exam_id}});
    if (findNext_Exam) throw new HttpException(409, "This user already has a exam date for this exam.");

    const createdNext_Exam:Next_Exam = await DB.Next_Exam.create(nextExam);

    return createdNext_Exam;
  }


}\}":?l.ik,ujyhgrfedwsa 0-+       nm 
