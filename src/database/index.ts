import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import { logger } from '@utils/logger';

import UserModel from '@models/users.model';
import ExamModel from '@models/exam.model';
import TopicModel from '@models/topic.model';
import SubTopicModel from '@models/subtopic.model';
import CardModel from '@models/card.model';
import Next_ExamModel from '@models/next-exam.model';
import User_SubtopicModel from '@/models/fav-subTopic.model';
import CustomCardModel from '@models/customCard.model';
import User_CardModel from '@models/user-card.model';
import ArticleModel from '@models/article.model';


const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

export const DB = {
  Users: UserModel(sequelize),
  Exams: ExamModel(sequelize),
  Topics: TopicModel(sequelize),
  SubTopics: SubTopicModel(sequelize),
  Cards: CardModel(sequelize),
  Next_Exam: Next_ExamModel(sequelize),
  User_Subtopic: User_SubtopicModel(sequelize),
  CustomCard: CustomCardModel(sequelize),
  User_Card: User_CardModel(sequelize),
  Article: ArticleModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
