import { useBridge, Bridge, Registry } from 'lepont'
import {
  MSG_TYPE_SET_ITEM,
  MSG_TYPE_GET_ITEM,
  SetPayload,
  GetPayload,
} from './shared'
import AsyncStorage from '@react-native-community/async-storage'

export function useAsyncStorage(
  registry: Registry,
  AsyncStorage = AsyncStorage
) {
  useBridge(
    registry,
    MSG_TYPE_SET_ITEM,
    async (p: SetPayload, _: Bridge): Promise<void> => {
      await AsyncStorage.setItem(p.key, JSON.stringify(p.value))
    }
  )
  useBridge(
    registry,
    MSG_TYPE_GET_ITEM,
    async (p: GetPayload, _: Bridge): Promise<string | null> => {
      const json = await AsyncStorage.getItem(p.key)
      if (!json) {
        return null
      }
      return JSON.parse(json)
    }
  )
}
