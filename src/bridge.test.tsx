import * as React from 'react'
import { useAsyncStorage } from './bridge'
import { useRegistry } from 'lepont'
import { renderHook, act } from '@testing-library/react-hooks'
import { MSG_TYPE_SET_ITEM, MSG_TYPE_GET_ITEM } from './shared'

const useApp = () => {
  const registry = useRegistry()
  useAsyncStorage(registry, {
    getItem() {
      return '{"a":1}'
    },
    setItem() {},
  })
  return registry
}

describe('useAsyncStorage', () => {
  it('registers setItem bridge', async () => {
    const { result } = renderHook(() => useApp())
    const webView = { injectJavaScript: jest.fn() }
    result.current.ref(webView)
    await result.current.onMessage({
      nativeEvent: {
        data: JSON.stringify({
          id: 1,
          message: {
            type: MSG_TYPE_SET_ITEM,
            payload: { key: 'key', value: 'value' },
          },
        }),
      },
    })
    const json = JSON.stringify({
      type: 'result',
      id: 1,
      message: {
        type: MSG_TYPE_SET_ITEM,
      },
    })
    expect(webView.injectJavaScript).toHaveBeenCalledWith(
      `LePont.recv(${json})`
    )
  })

  it('registers getItem bridge', async () => {
    const { result } = renderHook(() => useApp())
    const webView = { injectJavaScript: jest.fn() }
    result.current.ref(webView)
    await result.current.onMessage({
      nativeEvent: {
        data: JSON.stringify({
          id: 1,
          message: {
            type: MSG_TYPE_GET_ITEM,
            payload: { key: 'key' },
          },
        }),
      },
    })
    const json = JSON.stringify({
      type: 'result',
      id: 1,
      message: {
        type: MSG_TYPE_GET_ITEM,
        payload: { a: 1 },
      },
    })
    expect(webView.injectJavaScript).toHaveBeenCalledWith(
      `LePont.recv(${json})`
    )
  })
})
