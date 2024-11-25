import { defineConfig } from 'vite'
import { preset } from 'vite-config-preset'
import { remixFlatRoutes } from 'vite-plugin-remix-flat-routes'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  return preset({
    env,
    base: '/use-antd-resizable-header/',
    plugins: [remixFlatRoutes({ flatRoutesOptions: { ignoredRouteFiles: ['**/components/**', '**/hooks/**'] } })],
  })
})
