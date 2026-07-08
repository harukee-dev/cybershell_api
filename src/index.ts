import express, {Request, Response} from 'express'
import {computerRouter} from './routes/computerRoutes'

const app = express()
const PORT = 4200

app.use(express.json())
app.use('/api/computers', computerRouter)

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello world!'})
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порте ${PORT}`)
})
