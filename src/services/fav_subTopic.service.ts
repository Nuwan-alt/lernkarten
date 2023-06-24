import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUser_SubtopicDto } from '@/dtos/fav-subTopic.dto';
import { HttpException } from '@/exceptions/httpException';
import { FavSubtopic } from '@/interfaces/fav-subTopic.interface';
import { SubTopic } from '@/interfaces/subTopic.interface';
import { User } from '@/interfaces/users.interface';

@Service()
export class User_SubTopicService {


    public async setSubTopicFavourite(favSubtopicData:CreateUser_SubtopicDto): Promise<FavSubtopic> {
    
        const user:User = await DB.Users.findOne({where:{id:favSubtopicData.user_id}});
        if (!user) throw new HttpException(409, "User not found");
    
        const subTopic:SubTopic = await DB.SubTopics.findOne({where:{id:favSubtopicData.subtopic_id}});
        if (!subTopic) throw new HttpException(409, "Sub-topic not found");
    
        const fav_SubTopicData:FavSubtopic = await DB.User_Subtopic.create({...favSubtopicData, isFavourite:true});
      
        return fav_SubTopicData;
      }
    
      public async removeSubTopicFavourite(favSubtopicData:CreateUser_SubtopicDto): Promise<FavSubtopic> {
        
        const user:User = await DB.Users.findOne({where:{id:favSubtopicData.user_id}});
        if (!user) throw new HttpException(409, "User not found");
    
        const subTopic:SubTopic = await DB.SubTopics.findOne({where:{id:favSubtopicData.subtopic_id}});
        if (!subTopic) throw new HttpException(409, "Sub-topic not found");
    
        const user_subtopic:FavSubtopic = await DB.User_Subtopic.findOne({where:{user_id:favSubtopicData.user_id, subtopic_id:favSubtopicData.subtopic_id}});
        if (!user_subtopic) throw new HttpException(409, "This sub-topic is not a favourite of this user");
    
        await DB.User_Subtopic.destroy({where:{user_id:favSubtopicData.user_id, subtopic_id:favSubtopicData.subtopic_id}})
        return user_subtopic;
      }

      public async getFavSubTopicByUserID(userId:number): Promise<FavSubtopic[]> {
        
        const user:User = await DB.Users.findOne({where:{id:userId}}); 
        if (!user) throw new HttpException(409, "User not found");
    
        const user_subtopic:FavSubtopic[] = await DB.User_Subtopic.findAll({where:{user_id:userId}});
        if (!user_subtopic) throw new HttpException(409, "There are no favourite sub-topics for this user");
    

        return user_subtopic;
      }


}
