/* @refresh reload */
import { render } from 'solid-js/web'

import { App } from '@/ui/App.tsx'

const root = document.getElementById('root')

if (!(root instanceof HTMLElement)) {
  throw new Error('Root element not found.')
}

render(() => <App />, root)
