import * as z from 'zod'

export const createPcSchema = z.object({
	name: z.string().min(1),
	zone: z.enum(['COMMON', 'VIP', 'STREAMER']),
	pricePerHour: z.number().positive()
})