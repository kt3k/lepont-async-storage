import { setItem, getItem } from './index'
import { MSG_TYPE_SET_ITEM, MSG_TYPE_GET_ITEM } from './shared'
import { ReactNativeWebView } from 'lepont/mock'

beforeEach(() => {
  jest.spyOn(ReactNativeWebView, 'postMessage')
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('setItem', () => {
  it('sends the message to ReactNativeWebView', async () => {
    const p = setItem('key', 'value')

    const postMessage = ReactNativeWebView.postMessage

    const { id } = JSON.parse((postMessage as any).mock.calls[0][0])

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        id,
        message: {
          type: MSG_TYPE_SET_ITEM,
          payload: {
            key: 'key',
            value: 'value',
          },
        },
      })
    )
    ;(window as any).LePont.onResult({
      id,
      message: { type: '', payload: '' },
      error: null,
    })

    await p
  })
})
describe('getItem', () => {
  it('sends the message to RNWV', async () => {
    const p = getItem('key')

    const postMessage = ReactNativeWebView.postMessage

    const { id } = JSON.parse((postMessage as any).mock.calls[0][0])

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        id,
        message: {
          type: MSG_TYPE_GET_ITEM,
          payload: {
            key: 'key',
          },
        },
      })
    )
    ;(window as any).LePont.onResult({
      id,
      message: { type: MSG_TYPE_GET_ITEM, payload: { a: 1 } },
      error: null,
    })

    expect(await p).toEqual({ a: 1 })
  })
})
