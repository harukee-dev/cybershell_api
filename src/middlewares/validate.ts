import {Request, Response, NextFunction} from 'express'
import { ZodObject, z } from 'zod'

export const validate = (schema: ZodObject) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedBody = await schema.parseAsync(req.body)

			req.body = validatedBody

			next()
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
	}
}