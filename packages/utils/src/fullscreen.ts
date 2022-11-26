export interface EnhancedHTMLElement extends HTMLElement {
    webkitRequestFullScreen?: () => Promise<void>
    mozRequestFullScreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
}

interface EnhancedDocument extends Document {
    webkitExitFullscreen?: () => Promise<void>
    /**
     * @deprecated https://developer.apple.com/documentation/webkit/domdocument/1494852-webkitcancelfullscreen
     */
    webkitCancelFullScreen?: () => Promise<void>
    mozCancelFullScreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitFullScreenEnabled?: boolean
    mozFullScreenEnabled?: boolean
    msFullScreenEnabled?: boolean
    webkitFullscreenElement?: Element
    mozFullScreenElement?: Element
    msFullscreenElement?: Element
}

/**
 * 进入全屏
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen
 * @param element 全屏目标元素，默认是 body
 */
export async function enterFullscreen(element: EnhancedHTMLElement = document.body, options?: FullscreenOptions) {
    try {
        if (element.requestFullscreen) {
            await element.requestFullscreen(options)
        } else if (element.webkitRequestFullScreen) {
            await element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
            await element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
            await element.msRequestFullscreen()
        } else {
            throw new Error('该浏览器不支持全屏API')
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * 退出全屏
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
 */
export async function exitFullscreen() {
    const doc: EnhancedDocument = document
    try {
        if (doc.exitFullscreen) {
            await doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
            await doc.webkitExitFullscreen()
        } else if (doc.webkitCancelFullScreen) {
            await doc.webkitCancelFullScreen()
        } else if (doc.mozCancelFullScreen) {
            await doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
            await doc.msExitFullscreen()
        } else {
            throw new Error('该浏览器不支持全屏API')
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * @description 判断浏览器当前状态是否允许进入全屏
 */
export function isFullscreenEnabled(): boolean {
    return !!(
        (document as EnhancedDocument).fullscreenEnabled ||
        (document as EnhancedDocument).webkitFullScreenEnabled ||
        (document as EnhancedDocument).mozFullScreenEnabled ||
        (document as EnhancedDocument).msFullScreenEnabled
    )
}

/**
 * @description 获取全屏元素
 */
export function getFullscreenElement(): Element | null {
    const doc: EnhancedDocument = document
    return doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement || null
}

/**
 * @description 判断当前是否是全屏状态
 */
export function isFullscreen(): boolean {
    return !!getFullscreenElement() || window.innerHeight === window.screen.height
}

/**
 * @description 监听全屏变化事件
 * @param {Function} callback 回调函数
 */
export function listenFullscreen(callback: () => unknown): void {
    const doc: EnhancedDocument = document
    if (typeof doc.exitFullscreen !== 'undefined') {
        doc.addEventListener('fullscreenchange', callback, false)
    } else if (doc.webkitExitFullscreen) {
        doc.addEventListener('webkitfullscreenchange', callback, false)
    } else if (doc.mozCancelFullScreen) {
        doc.addEventListener('mozfullscreenchange', callback, false)
    } else if (doc.msExitFullscreen) {
        doc.addEventListener('MSFullscreenChange', callback, false)
    } else {
        throw new Error('该浏览器不支持全屏API')
    }
}

export function preventF11DefaultAction(): void {
    window.addEventListener('keydown', (e) => {
        // https://w3c.github.io/uievents-code/
        if (e.code === 'F11') {
            e.preventDefault()
            if (isFullscreen()) {
                exitFullscreen()
            } else {
                enterFullscreen()
            }
        }
    })
}
