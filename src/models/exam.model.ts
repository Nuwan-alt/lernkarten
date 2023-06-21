import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Exam } from '@interfaces/exam.interface';

export type ExamCreationAttributes = Partial<Exam>;

export class ExamModel extends Model<Exam, ExamCreationAttributes> implements Exam {
  public id: number;
  public title: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ExamModel {
  ExamModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'exams',
      sequelize,
    },
  );

  return ExamModel;
}
