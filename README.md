# @lepont/async-storage v0.4.1

![ci](https://github.com/kt3k/lepont-async-storage/workflows/ci/badge.svg)
[![codecov](https://codecov.io/gh/kt3k/lepont-async-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/lepont-async-storage)

> Async Storage Bridge for [lepont][]

You can use [AsyncStorage][] through [lepont][].

# Install

```
npm i --save lepont @react-native-community/async-storage @lepont/async-storage
```

# Usage

React Native side:

```tsx
import React from 'react'
import { useBridge } from 'lepont'
import { WebView } from 'react-native-webview'
import { AsyncStorageBridge } from '@lepont/async-storage/bridge'
import AsyncStorage from '@react-native-community/async-storage'

const App = () => {
  const [ref, onMessage] = useRegistry(AsyncStorageBridge(AsyncStorage))

  return (
    <WebView
      source={{ uri: 'Web.bundle/index.html' }}
      javaScriptEnabled={true}
      ref={ref}
      onMessage={onMessage}
    />
  )
}
```

Browser side:

```ts
import { setItem, getItem } from '@lepont/async-storage'

await setItem('@storage_Key', { my: 'value' })
await getItem('@storage_Key') // => { my: 'value' }
```

# LICENSE

MIT

[lepont]: https://github.com/kt3k/lepont
[AsyncStorage]: https://github.com/react-native-community/async-storage
