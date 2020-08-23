import { useBridge, Bridge, Registry } from 'lepont'
import {
  MSG_TYPE_SET_ITEM,
  MSG_TYPE_GET_ITEM,
  SetPayload,
  GetPayload,
} from './shared'

type AsyncStorage = {
  setItem: (k: string, v: string) => Promise<void>
  getItem: (k: string) => Promise<string>
}

export const AsyncStorageBridge = (s: AsyncStorage) => (registry: Registry) => {
  registry.register(
    MSG_TYPE_SET_ITEM,
    async (p: SetPayload, _: Bridge): Promise<void> => {
      await s.setItem(p.key, JSON.stringify(p.value))
    }
  )
  registry.register(
    MSG_TYPE_GET_ITEM,
    async (p: GetPayload, _: Bridge): Promise<string | null> => {
      const json = await s.getItem(p.key)
      if (!json) {
        return null
      }
      return JSON.parse(json)
    }
  )
}
