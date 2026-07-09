import Router, {Request, Response} from 'express'
import { computersDB } from '../db'
import { IPC, ZoneTypes } from '../types'
import { createPcSchema } from '../validators/computersValidator'
import * as z from 'zod'

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

computerRouter.post('/', async (req: Request, res: Response) => {
	try {
		const validatedBody = await createPcSchema.parseAsync(req.body)

		const {name, zone, pricePerHour} = validatedBody


		const newPC: IPC = {
			id: `${Date.now()}`,
			name,
			zone,
			status: 'FREE',
			pricePerHour
		}

		computersDB.push(newPC)

		res.status(201).json({ message: 'ПК успешно добавлен', PC: newPC})
	} catch(error) {

		if(error instanceof z.ZodError) {
			return res.status(400).json({
				status: 'fail',
				errors: error.issues.map((err) => ({
					field: err.path[0],
					message: err.message
				}))
			})
		}
		
		res.status(500).json({ message: 'Ошибка на стороне сервера'})
	}
})