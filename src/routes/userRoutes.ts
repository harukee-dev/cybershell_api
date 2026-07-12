import Router, {Request, Response} from 'express'
import { usersDB } from '../db'
import { createUserSchema, topupSchema } from '../validators/usersValidator'
import { validate } from '../middlewares/validate'
import { IUser } from '../types'
import { isAdmin } from '../middlewares/auth'

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

	res.status(200).json({ message: 'Пользователь успешно создан', user: newUser})
})

userRouter.post('/:id/topup', isAdmin(), validate(topupSchema), (req: Request, res: Response) => {
	const {id} = req.params
	const {amount} = req.body

	if(usersDB.filter((el: IUser) => el.id === id).length <= 0) 
		return res.status(404).json({ message: 'Пользователь не найден'})

	usersDB.map((el: IUser) => {
		if(el.id === id) el.balance += amount
	})

	res.status(200).json({ message: 'Баланс пользователя успешно пополнен'})
})

userRouter.post('/:id/ban', isAdmin(), (req: Request, res: Response) => {
	const {id} = req.params

	console.log(id)
	
	usersDB.forEach((user: IUser) => {
		if(user.id == id) {
			user.isBanned = true
			return res.status(200).json({ message: 'Пользователь успешно забанен'})
		}
	})

	res.status(404).json({ message: 'Пользователь не найден'})
})