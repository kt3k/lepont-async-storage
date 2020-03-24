import { sendMessage } from 'lepont/browser'
import { MSG_TYPE_GET_ITEM, MSG_TYPE_SET_ITEM } from './shared'

export async function setItem(key: string, value: unknown) {
  await sendMessage({
    type: MSG_TYPE_SET_ITEM,
    payload: JSON.stringify(value),
  })
}
