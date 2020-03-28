import { sendMessage } from 'lepont/browser'
import { MSG_TYPE_GET_ITEM, MSG_TYPE_SET_ITEM } from './shared'

/**
 * Sets the item to the async storage.
 */
export async function setItem<T>(key: string, value: T): Promise<void> {
  await sendMessage<void, { key: string; value: T }>({
    type: MSG_TYPE_SET_ITEM,
    payload: {
      key,
      value,
    },
  })
}

/**
 * Gets the item from the async storage.
 */
export async function getItem<T>(key: string): Promise<T | null> {
  const json = await sendMessage<T, { key: string }>({
    type: MSG_TYPE_GET_ITEM,
    payload: { key },
  })

  return json
}
