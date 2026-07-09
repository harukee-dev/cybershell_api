import Router, {Request, Response} from 'express'
import { computersDB } from '../db'
import { IPC } from '../types'
import { createPcSchema } from '../validators/computersValidator'
import { validate } from '../middlewares/validate'

export const computerRouter = Router()

computerRouter.get('/', (req: Request, res: Response) => {
	res.status(200).json(computersDB)
})

computerRouter.get('/zone/:zoneName', (req: Request, res: Response) => {
	const {zoneName} = req.params
	
	const filteredComputers = computersDB.filter((el: IPC) => el.zone === zoneName)

	if(filteredComputers.length > 0)
		res.status(200).json(filteredComputers)
	
	else
		res.status(400).json({ message: 'Такой зоны нет или она пустая'})
})

computerRouter.post('/', validate(createPcSchema), (req: Request, res: Response) => {
		const {name, zone, pricePerHour} = req.body

		const newPC: IPC = {
			id: `${Date.now()}`,
			name,
			zone,
			status: 'FREE',
			pricePerHour
		}

		computersDB.push(newPC)

		res.status(201).json({ message: 'ПК успешно добавлен', PC: newPC})
})