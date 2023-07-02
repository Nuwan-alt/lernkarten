import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ExamRoute } from './routes/exam.route';
import { TopicRoute } from './routes/topic.route';
import { SubTopicRoute } from './routes/subTopic.route';
import { CardRoute } from './routes/card.route';
import { ArticleRoute } from './routes/article.route';
import { ContentRoute } from './routes/content.route';
import { Fav_SubTopicRoute } from './routes/fav-subTopic.route';
import { StrategyRoute } from './routes/strategy.route';
import { AdminRoute } from './routes/admin.route';


ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new ExamRoute(),
    new TopicRoute(), new SubTopicRoute(), new CardRoute(), new ArticleRoute(),
     new ContentRoute, new Fav_SubTopicRoute(), new StrategyRoute(), new AdminRoute()]);

app.listen();
