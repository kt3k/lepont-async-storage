import { useBridge } from 'lepont'
import { MSG_TYPE_SET_ITEM, MSG_TYPE_GET_ITEM } from './shared'
import AsyncStorage from '@react-native-community/async-storage'

export function useAsyncStorage(registry: any) {
  useBridge(registry, MSG_TYPE_SET_ITEM, async () => {})
  useBridge(registry, MSG_TYPE_GET_ITEM, async () => {})
}
