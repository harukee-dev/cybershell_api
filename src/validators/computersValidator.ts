import * as z from 'zod'

export const createPcSchema = z.object({
	name: z.string('Имя ПК должно быть строкой').min(1, 'Имя не должно быть пустой строкой'),
	zone: z.enum(['COMMON', 'VIP', 'STREAMER'], 'зона должна быть только COMMON, VIP или STREAMER'),
	pricePerHour: z.number('цена должна быть числом').positive('цена должна быть положительным')
})