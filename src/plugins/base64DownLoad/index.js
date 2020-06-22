/**
 *  base64下载插件
 */
function base64Img2Blob (code) {
    const parts = code.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: contentType })
}

function base64DownLoad (fileName, content) {
    const aLink = document.createElement('a')
    // new Blob([content])
    const blob = base64Img2Blob(content)
    const evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.dispatchEvent(evt)
}

module.exports = base64DownLoad
