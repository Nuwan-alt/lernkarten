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

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new ExamRoute(), new TopicRoute(), new SubTopicRoute(), new CardRoute(), new ArticleRoute(), new ContentRoute]);

app.listen();
