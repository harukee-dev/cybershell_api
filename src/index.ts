import express, {Request, Response} from 'express'

const app = express()
const PORT = 4200

app.get('/', (req: Request, res: Response) => {
	res.json({ message: 'Hello world!'})
})

app.listen(PORT, () => {
	console.log(`Сервер запущен на порте ${PORT}`)
})
