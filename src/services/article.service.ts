import { Service } from 'typedi';
import { DB } from '@database';
import { CreateArticledDto } from '@dtos/article.dto';
import { HttpException } from '@/exceptions/httpException';
import { Article } from '@interfaces/article.interface';

@Service()
export class ArticleService {

  public async createArticle( articleData: CreateArticledDto): Promise<Article> { 
    

    const createArticleData: Article = await DB.Article.create(articleData);
    return createArticleData;
  }

  public async updateArticle(articleId: number, articleData: CreateArticledDto): Promise<Article> {
    const findArticle: Article = await DB.Article.findByPk(articleId);
    if (!findArticle) throw new HttpException(409, "Article doesn't exist");

    await DB.Article.update(articleData, { where: { id: articleId } });

    const updateArticle: Article = await DB.Article.findByPk(articleId);
    return updateArticle;
  }

  public async deleteArticle(articleId: number): Promise<Article> {
    const findArticle: Article = await DB.Article.findByPk(articleId);
    if (!findArticle) throw new HttpException(409, "Article doesn't exist");

    await DB.Article.destroy({ where: { id: articleId } });

    return findArticle;
  }
}
