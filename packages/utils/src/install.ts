/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T &
    Plugin & {
        displayName: string
        name: string
    }

export const withInstall = <T>(comp: T) => {
    const c = comp as any
    c.install = function (app: App) {
        app.component(c.displayName || c.name, c)
    }

    return c as SFCWithInstall<T>
}
