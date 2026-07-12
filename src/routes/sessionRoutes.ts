import Router, {Request, Response} from 'express'
import { isAdmin } from '../middlewares/auth'
import { computersDB, sessionsDB, usersDB } from '../db'
import { validate } from '../middlewares/validate'
import { createSessionSchema } from '../validators/sessionValidator'
import { IPC, IUser } from '../types'

export const sessionRouter = Router()

sessionRouter.get('/', isAdmin(), (req: Request, res: Response) => {
	res.status(200).json(sessionsDB)
})

sessionRouter.post('/', isAdmin(), validate(createSessionSchema), (req: Request, res: Response) => {
	const {userId, pcId, durationHours} = req.body
	const targetUser = usersDB.filter((user: IUser) => user.id === userId)
	const targetPc = computersDB.filter((pc: IPC) => pc.id === pcId)

	if(targetUser.length <= 0) return res.status(404).json({ message: 'Пользователь не найден'})

	if(targetUser[0].isBanned === true) return res.status(400).json({ message: 'Данный пользователь находится в бане'})

	if(targetPc.length <= 0) return res.status(404).json({ message: 'Компьютер не найден'})

	if(targetPc[0].status !== 'FREE') return res.status(400).json({ message: 'Компьютер занят или ремонтируется'})
	
	const sessionPrice = targetPc[0].pricePerHour * durationHours

	if(targetUser[0].balance < sessionPrice) return res.status(400).json({ message: 'На балансе пользователя недостаточно средств'})
	
	usersDB.forEach((user: IUser) => {
		if(user.id === userId) {
			user.balance -= sessionPrice
		}
	})

	computersDB.forEach((pc: IPC) => {
		if(pc.id === pcId) {
			pc.status = "BUSY"
		}
	})

	sessionsDB.push({
		id: `${Date.now()}`,
		userId,
		pcId,
		startTime: new Date(),
		durationHours
	})

	const sessionDuration = 10000 * durationHours // 1 час = 10 секунд реального времени (для удобного тестирования)

	setTimeout(() => {
		computersDB.forEach((pc: IPC) => {
			if(pc.id === pcId && pc.status === 'BUSY') pc.status = 'FREE'
		})
	}, sessionDuration)

	res.status(201).json({ message: 'Сессия успешно запущена'})
})
