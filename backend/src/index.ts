import Express from 'express'
import authRouter from './routes/auth'
import workoutRouter from './routes/workout'
import sessionSchemaRouter from './routes/sessionSchema'
import sessionInstanceRouter from './routes/sessionInstance'
import cookieParser from 'cookie-parser'
import { jwtUserPayloadType } from './utils/setAuthTokenAsCookie'
import cors from 'cors'


const app = Express()

app.set('trust proxy', 1);

app.use(Express.json())
app.use(cookieParser())


app.use(
    cors({
        origin: process.env.CLIENT_URL as string ?? '/',
        credentials: true,
    })
)
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
app.use('/api/sessionSchema/', sessionSchemaRouter)
app.use('/api/sessionInstance/', sessionInstanceRouter)





const port=process.env.PORT || 8000
app.listen(port, async () => {
    console.log(`listening at ${port}`)
})
