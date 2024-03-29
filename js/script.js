settings.style.display = 'none';
session.style.display = 'none';
editTime.style.display = 'none';
const timeRequest = new XMLHttpRequest();
timeRequest.open("GET", "/times.json");
timeRequest.onload = function () {
    if (timeRequest.status === 200) {
        importetTimes = JSON.parse(timeRequest.responseText);
        console.log(importetTimes)
    }
};
// timeRequest.send();

moves['r'] = new Array("R", "R'", "R2");
moves['l'] = new Array("L", "L'", "L2");
moves['u'] = new Array("U", "U'", "U2");
moves['d'] = new Array("D", "D'", "D2");
moves['f'] = new Array("F", "F'", "F2");
moves['b'] = new Array("B", "B'", "B2");

keys = new Array("r", "l", "u", "d", "f", "b");



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

    fullscreenAd('afterfirstsolveAd', true, '1')
    fullscreenAd('after50solveAd', true, '2')
    getKaiAd({
        publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
        app: 'Rubik\'s Cube Timer',
        slot: 'SessionsAd',
        h: 70,
        w: 200,
        test: 1,
        container: document.getElementById('ad-container2'),
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {

            ad.call('display', {
                tabindex: 1,
                navClass: 'td',
                display: 'block',
            })
        }
    })
});

function fullscreenAd(slotname, preload, buttonName) {
    return
    getKaiAd({
        publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
        app: 'Rubik\'s Cube Timer',
        slot: slotname,
        test: 1,
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {
            if (preload) {
                let button = document.querySelector('#showAd' + buttonName)
                console.log(button)
                button.addEventListener('click', function btnListener() {
                    button.removeEventListener('click', btnListener)
                    ad.call('display')
                })
                return
            }
            ad.call('display');
        }
    })
}

setInterval(() => {
    if (!timing) fullscreenAd('5minAD')
}, 300000);