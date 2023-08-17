


window.onerror = function (msg, url, linenumber, a, b) {
    console.log('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber + ' Type: ' + a + b);
    return true;
}


getKaiAd({
    publisher: 'fe2d9134-74be-48d8-83b9-96f6d803efef',
    app: 'rubikscubetimerr',
    test: 1,
    onerror: err => console.error('error getting ad:', err),
    onready: ad => {
        ad.call('display');
    }
})