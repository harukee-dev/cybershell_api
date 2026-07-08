import Router, {Request, Response} from 'express'
import { computersDB } from '../db'
import { IPC, ZoneTypes } from '../types'

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

