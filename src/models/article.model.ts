import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Article } from '@interfaces/article.interface';

export type ArticleCreationAttributes = Partial<Article>;

export class ArticleModel extends Model<Article, ArticleCreationAttributes> implements Article {
  public id: number;
  public title: string;
  public content: string;
  public image: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ArticleModel {
  ArticleModel.init(
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
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'articles',
      sequelize,
    },
  );

  return ArticleModel;
}
