import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ContentService } from '@services/content.service';

export class ContentController {
  private content = Container.get(ContentService);

  public getAllContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const createContentData: any = await this.content.getContent();

      res.status(200).json({ examModels: createContentData});
    } catch (error) {
      next(error);
    }
  };

}
