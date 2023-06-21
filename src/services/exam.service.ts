import { Service } from 'typedi';
import { DB } from '@database';
import { CreateExamDto } from '@dtos/exam.dto';
import { HttpException } from '@/exceptions/httpException';
import { Exam } from '@interfaces/exam.interface';

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
}
