export type GameType = {
  id: string | number // уникальный идентификатор
  text?: string // текст цитаты
  name?: string // текст цитаты
  description: string
}

export type GameListType = GameType[]


export type NotificationType = {
  time: string // время в формате HH:mm
  id: string // уникальный идентификатор уведомления
  label: string // метка уведомления
}