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
export function enterFullscreen(element: EnhancedHTMLElement = document.body) {
    try {
        if (element.requestFullscreen) {
            element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen()
        } else {
            throw new Error('该浏览器不支持全屏API')
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * @description 退出全屏
 */
export function exitFullscreen(): void {
    const doc: EnhancedDocument = document
    try {
        if (doc.exitFullscreen) {
            doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen()
        } else if (doc.webkitCancelFullScreen) {
            doc.webkitCancelFullScreen()
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen()
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
    const doc: EnhancedDocument = document
    return Boolean(doc.fullscreenEnabled || doc.webkitFullScreenEnabled || doc.mozFullScreenEnabled || doc.msFullScreenEnabled)
}

/**
 * @description 获取全屏元素
 */
export function getFullscreenElement(): Element | null {
    let element: Element | null = null
    const doc: EnhancedDocument = document
    if (doc.fullscreenElement) {
        element = doc.fullscreenElement
    } else if (doc.webkitFullscreenElement) {
        element = doc.webkitFullscreenElement
    } else if (doc.mozFullScreenElement) {
        element = doc.mozFullScreenElement
    } else if (doc.msFullscreenElement) {
        element = doc.msFullscreenElement
    }
    return element
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
