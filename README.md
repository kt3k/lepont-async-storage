# @lepont/async-storage

> Async Storage Bridge for [lepont][]

You can use [AsyncStorage][] through [lepont][].

# Install

```
npm i --save lepont
npm i --save @react-native-community/async-storage
npm i --save @lepont/async-storage
```

# Usage

React Native side:

```ts
import React from 'react'
import { useRegistry } from 'lepont'
import { WebView } from 'react-native-webview'
import { useAsyncStorage } from '@lepont/async-storage/bridge'
import AsyncStorage from '@react-native-community/async-storage'

const App = () => {
  const registry = useRegistry()
  useAsyncStorage(registry, AsyncStorage)
  return (
    <WebView
      source={{ uri: 'Web.bundle/index.html' }}
      javaScriptEnabled={true}
      ref={registry.ref}
      onMessage={registry.onMessage}
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
