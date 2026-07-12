import * as z from 'zod'

export const createSessionSchema = z.object({
	userId: z.string('ID пользователя должен быть строкой').min(1, 'Строка должна быть не пустой'),
	pcId: z.string('ID компьютера должен быть строкой').min(1, 'Строка должна быть не пустой'),
	durationHours: z.int('Длительность должна быть целым числом')
})