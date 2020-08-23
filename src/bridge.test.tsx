import * as React from 'react'
import { AsyncStorageBridge } from './bridge'
import { useBridge } from 'lepont'
import { renderHook } from '@testing-library/react-hooks'
import { MSG_TYPE_SET_ITEM, MSG_TYPE_GET_ITEM } from './shared'

const useApp = () =>
  useBridge(
    AsyncStorageBridge({
      async getItem() {
        return '{"a":1}'
      },
      async setItem() {},
    })
  )

describe('AsyncStorageBridge', () => {
  it('registers setItem bridge', async () => {
    const {
      result: {
        current: [ref, onMessage],
      },
    } = renderHook(() => useApp())
    const webView = { injectJavaScript: jest.fn() }
    ref(webView)
    await onMessage({
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
    const {
      result: {
        current: [ref, onMessage],
      },
    } = renderHook(() => useApp())
    const webView = { injectJavaScript: jest.fn() }
    ref(webView)
    await onMessage({
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
