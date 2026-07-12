import {Request, Response, NextFunction} from 'express'
import "dotenv/config"

const ADMIN_KEY = process.env.ADMIN_KEY

export const isAdmin = () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const adminKey = req.headers['x-admin-key']

		if(adminKey == undefined || adminKey !== ADMIN_KEY) {
			return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора'})
		}

		next()
	}
}