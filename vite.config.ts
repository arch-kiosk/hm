// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import { defineConfig } from 'vite'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, "env");
  return {
    build: {
      copyPublicDir: false,
      lib: {
        entry: resolve(__dirname, 'src/hm-component.ts'),
        name: 'HMComponent',
        filename: 'hmcomponent',
        formats: ['es'],
      },
      rollupOptions: {
        external: [/^lit/,"@polymer/polymer",/^polymer/,/^@polymer/,/^@vaadin/]
      },
    },
    esbuild:
        command == "build"
            ? {
              //No console.logs in the distribution
              drop: ["console", "debugger"],
            }
            : {},
    server: {
      port: 5174,
      fs: {
        strict: true,
        host: true,
        // allow: [searchForWorkspaceRoot(process.cwd()), "../../../static/scripts/kioskapplib"],
      },
    },
    plugins: [dts()]
    // publicDir: "/public",
}})
