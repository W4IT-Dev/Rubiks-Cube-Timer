settings.style.display = 'none';
session.style.display = 'none';
editTime.style.display = 'none';


moves['r'] = new Array("R", "R'", "R2");
moves['l'] = new Array("L", "L'", "L2");
moves['u'] = new Array("U", "U'", "U2");
moves['d'] = new Array("D", "D'", "D2");
moves['f'] = new Array("F", "F'", "F2");
moves['b'] = new Array("B", "B'", "B2");

keys = new Array("r", "l", "u", "d", "f", "b");

if (loadScreen.style.display == 'block') {
    load = setInterval(() => { progress.value += .09 }, 150)
} else {
    clearInterval(load);
}
setTimeout(() => { loadScreen.style.display = 'none'; document.querySelector('footer').style.opacity = '1' }, 2300)


function softkey(e) {
    const { target, key, bubbles, cancelable, repeat, type } = e;
    if (!/Left|Right/.test(key) || !key.startsWith("Arrow") || !e.ctrlKey) return;
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    target.dispatchEvent(new KeyboardEvent(type, { key: "Soft" + key.slice(5), bubbles, cancelable, repeat }));
}

document.addEventListener("keyup", softkey, true);
document.addEventListener("keydown", softkey, true);

document.addEventListener("DOMContentLoaded", () => {
    return
    // getKaiAd({
    //     publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
    //     app: 'Rubik\'s Cube Timer',
    //     slot: 'TimingAd',
    //     h: 70,
    //     w: 200,
    //     test: 1,
    //     // Max supported size is 240x264
    //     // container is required for responsive ads
    //     container: document.getElementById('ad-container1'),
    //     onerror: err => console.error('Custom catch:', err),
    //     onready: ad => {

    //         // Ad is ready to be displayed
    //         // calling 'display' will display the ad
    //         ad.call('display', {
    //             tabindex: 0,
    //             navClass: 'items',
    //             display: 'block',
    //         })
    //     }
    // })
    getKaiAd({
        publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
        app: 'Rubik\'s Cube Timer',
        slot: 'SessionsAd',
        h: 70,
        w: 200,
        test: 1,
        // Max supported size is 240x264
        // container is required for responsive ads
        container: document.getElementById('ad-container2'),
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {

            // Ad is ready to be displayed
            // calling 'display' will display the ad
            ad.call('display', {
                tabindex: 1,
                navClass: 'td',
                display: 'block',
            })
        }
    })
    getKaiAd({
        publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
        app: 'Rubik\'s Cube Timer',
        slot: 'SettingsAd',
        h: 70,
        w: 200,
        test: 1,
        // Max supported size is 240x264
        // container is required for responsive ads
        container: document.getElementById('ad-container3'),
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {

            // Ad is ready to be displayed
            // calling 'display' will display the ad
            ad.call('display', {
                tabindex: 1,
                navClass: 'setting',
                display: 'block',
            })
        }
    })
});
