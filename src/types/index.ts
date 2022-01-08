export interface Api<T> {
	data: T
	message: string
	ok: boolean
}

export interface Prefecture {
	id: number
	name: string
}

export interface Patient {
	date: string
	id: number
	people: number
	prefecture_id: number
}
