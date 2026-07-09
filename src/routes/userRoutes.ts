import Router, {Request, Response} from 'express'
import { usersDB } from '../db'
import { createUserSchema } from '../validators/usersValidator'
import { validate } from '../middlewares/validate'

export const userRouter = Router()

userRouter.get('/', (req: Request, res: Response) => {
	res.json(usersDB)
})

userRouter.post('/', validate(createUserSchema), (req: Request, res: Response) => {
	const {username} = req.body

	const newUser = {
		id: `${Date.now()}`,
		username,
		balance: 0,
		isBanned: false,
	}

	usersDB.push(newUser)

	res.status(200).json({ message: "Пользователь успешно создан", user: newUser})
})