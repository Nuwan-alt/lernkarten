import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateArticledDto } from '@dtos/article.dto';
import { Article } from '@interfaces/article.interface';
import { ArticleService } from '@services/article.service';

export class ArticleController {
  private article = Container.get(ArticleService);

  public createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleData: CreateArticledDto = req.body;
      const createArticleData: Article = await this.article.createArticle(articleData);

      res.status(201).json({ data: createArticleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId = Number(req.params.id);
      const articleData: CreateArticledDto = req.body;
      const updatedArticleData: Article = await this.article.updateArticle(articleId,articleData)

      res.status(200).json({ data: updatedArticleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articleId = Number(req.params.id);
      const deleteArticleData: Article = await this.article.deleteArticle(articleId);

      res.status(200).json({ data: deleteArticleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
