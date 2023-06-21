import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ExamRoute } from './routes/exam.route';
import { TopicRoute } from './routes/topic.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new ExamRoute(), new TopicRoute()]);

app.listen();
