// тип игровых зон, они могут быть только одним из трех конкретных значений (union type)
// Обычная, Вип, Стримерская
export type ZoneType = 'COMMON' | 'VIP' | 'STREAMER'

// тип статуса пк, тоже union type, в котором на выбор 3 значения
// Свободен, Занят, Техобслуживание
export type PcStatus = 'FREE' | 'BUSY' | 'MAINTENANCE'

// интерфейс пк
export interface IPC {
	id: string, // уникальный id пк
	name: string, // имя пк (например, "PC-01")
	zone: ZoneType, // игровая зона, в которой стоит пк
	status: PcStatus, // текущий статус пк
	pricePerHour: number // часовая стоимость пк
}