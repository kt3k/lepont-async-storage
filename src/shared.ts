export const MSG_TYPE_SET_ITEM = '@lepont/async-storage:setItem'
export const MSG_TYPE_GET_ITEM = '@lepont/async-storage:getItem'
export type GetPayload = {
  key: string
}
export type SetPayload = {
  key: string
  value: string
}
