import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
import { storageRouter } from './routes/storage'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

//Routes
app.use('/*',cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);
app.route('/api/v1/storage',storageRouter);

export default app
