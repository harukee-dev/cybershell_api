import express, {Request, Response} from 'express'
import {computerRouter} from './routes/computerRoutes'
import "dotenv/config"
import cors from 'cors'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api/computers', computerRouter)

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello world!'})
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порте ${PORT}`)
})
