import { sendMessage } from 'lepont/browser'
import { MSG_TYPE_GET_ITEM, MSG_TYPE_SET_ITEM } from './shared'

/**
 * Sets the item to the async storage.
 */
export async function setItem(key: string, value: unknown): Promise<void> {
  await sendMessage({
    type: MSG_TYPE_SET_ITEM,
    payload: {
      key,
      value: JSON.stringify(value),
    },
  })
}

/**
 * Gets the item from the async storage.
 */
export async function getItem(key: string): Promise<any> {
  const json = await sendMessage<string>({
    type: MSG_TYPE_GET_ITEM,
    payload: { key },
  })

  return JSON.parse(json)
}
