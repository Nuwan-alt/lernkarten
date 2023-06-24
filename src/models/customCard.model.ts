import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { CustomCard } from '@interfaces/customCard.interface';
import { SubTopicModel } from './subtopic.model';
import { UserModel } from './users.model';
import { CardModel } from './card.model';

export type CustomCardCreationAttributes = Partial<CustomCard>;

export class CustomCardModel extends Model<CustomCard, CustomCardCreationAttributes> implements CustomCard {
  public id: number;
  public card_id: number;
  public user_id: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CustomCardModel {
  CustomCardModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      card_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CardModel,
          key: 'id',
        },
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: UserModel,
          key: 'id',
        },
      },
      
    },
    {
      tableName: 'custom_cards',
      sequelize,
    },
  );

  
  UserModel.hasMany(CustomCardModel, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate:'CASCADE' });
  CardModel.hasMany(CustomCardModel, { foreignKey: 'card_id', onDelete: 'CASCADE', onUpdate:'CASCADE' });

  return CustomCardModel;
}
