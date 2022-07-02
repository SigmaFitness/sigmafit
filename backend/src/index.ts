import Express from 'express'
import authRouter from './routes/auth'
import workoutRouter from './routes/workout'
import cookieParser from 'cookie-parser'
import { jwtUserPayloadType } from './utils/setAuthTokenAsCookie'

const app = Express()
app.use(Express.json())
app.use(cookieParser())
// TODO: Cors

declare global {
    namespace Express {
        interface Request {
            user: jwtUserPayloadType & { iat: number }
        }
    }
}

app.use('/api/auth/', authRouter)
app.use('/api/workout/', workoutRouter)



app.listen(8000, async () => {
    console.log('listening at 8000')
})
