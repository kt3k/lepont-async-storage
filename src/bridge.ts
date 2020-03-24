import { useBridge } from 'lepont'
import { MSG_TYPE_SET_ITEM, MSG_TYPE_GET_ITEM, SetPayload, GetPayload } from './shared'
import AsyncStorage from '@react-native-community/async-storage'

export function useAsyncStorage(registry: any) {
  useBridge(registry, MSG_TYPE_SET_ITEM, async (p: SetPayload, _: unknown): Promise<void> => {
    await AsyncStorage.setItem(p.key, p.value)
  })
  useBridge(registry, MSG_TYPE_GET_ITEM, (p: GetPayload, _: unknown): unknown => {
    return AsyncStorage.getItem(p.key)
  })
}
