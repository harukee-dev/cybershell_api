import * as z from 'zod'

export const createUserSchema = z.object({
	username: z.string('Никнейм должен быть строкой').min(3, 'Никнейм должен быть от 3 символов')
})