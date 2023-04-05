export function initShare() {
    if (!('share' in navigator)) {
        return
    }
    const shareBtn = document.getElementById("share-btn");
    shareBtn.style.display = "";
    shareBtn.addEventListener("click", share);
}

async function share() {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.querySelector("#container > canvas");

    canvas.toBlob(async (blob) => {
        // https://stackoverflow.com/questions/68362603/share-image-via-social-media-from-pwa
        const files = [new File([blob], canvas.title + '.png', { type: blob.type })];
        const shareData = {
            text: canvas.title,
            title: '薮猫报时器提醒您……',
            files,
        }
        if (navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err.name, err.message)
                }
            }
        } else {
            console.warn('Sharing not supported', shareData)
        }
    });
}
