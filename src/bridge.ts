import { useBridge, Bridge, Registry } from 'lepont'
import {
  MSG_TYPE_SET_ITEM,
  MSG_TYPE_GET_ITEM,
  SetPayload,
  GetPayload,
} from './shared'
import AsyncStorage from '@react-native-community/async-storage'

export function useAsyncStorage(registry: Registry) {
  useBridge(
    registry,
    MSG_TYPE_SET_ITEM,
    async (p: SetPayload, _: Bridge): Promise<void> => {
      await AsyncStorage.setItem(p.key, p.value)
    }
  )
  useBridge(
    registry,
    MSG_TYPE_GET_ITEM,
    (p: GetPayload, _: Bridge): Promise<string | null> => {
      return AsyncStorage.getItem(p.key)
    }
  )
}
