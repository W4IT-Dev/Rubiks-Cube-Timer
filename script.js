let timing = spacedown = canStart = false;
let a;
document.addEventListener('keydown', e => {
    if (spacedown || timing) return
    document.querySelector('#timer-container').style.color = "red"
    a = setTimeout(() => {
        document.querySelector('#timer-container').style.color = "green"

        canStart = true;
    }, 550)
    spacedown = true;
})

document.addEventListener('keyup', () => {
    if (spacedown) {
        if (canStart) return start();
        clearTimeout(a);
        canStart = spacedown = timing=  false;
        document.querySelector('#timer-container').style.color = "unset"

    }
})

function start() {
    spacedown = canStart = false;
    timing = true;
    document.querySelector('#timer-container').style.color = "unset";
    const ms = document.querySelector('#milliseconds');
    const s = document.querySelector('#seconds');
    const min = document.querySelector('#minutes');
    const h = document.querySelector('#hours');
    const seperation = document.querySelectorAll('.seperation');
    ms.innerText = s.innerText = min.innerText = h.innerText = 0;
    h.style.display = "none", min.style.display = "none", seperation[0].style.display = "none", seperation[1].style.display = "none";
    timer = setInterval(() => {
        ms.innerText++;
        if (ms.innerText == 9) s.innerText++, ms.innerText = 0, console.log('ms');
        if (s.innerText == 59) min.innerText++, s.innerText = 0, console.log('s');
        if (min.innerText == 59) h.innerText++, min.innerText = 0, console.log('min');
    }, 100)
    // let wakelock = navigator.requestWakeLock('screen');
    if(!timing) return
    document.addEventListener('keydown', stop)

    function stop() {
        if(!timing) return
        clearInterval(timer)
        var style = document.querySelector('#timer-container').style;
        style.setProperty('--color', 'green');
        timing = false;
        getScramble();

        // wakelock.unlock();
    }
}

function getScramble() {
	var moves = new Array();
	moves['r'] = new Array("R","R'","R2");
	moves['l'] = new Array("L","L'","L2");
	moves['u'] = new Array("U","U'","U2");
	moves['d'] = new Array("D","D'","D2");
	moves['f'] = new Array("F","F'","F2");
	moves['b'] = new Array("B","B'","B2");

	var limit = 25;
	var last = "";
	var scramble = "";
	var keys = "";

	for (var i=1;i<=limit;i++) {
		keys = new Array("r","l","u","d","f","b");
		shuffle(keys);
		while (last == keys[0]) {
			shuffle(keys);
		}
		shuffle(moves[keys[0]]);
		move = moves[keys[0]][0];
		scramble += move+" ";
		last = keys[0];
	}
	document.querySelector('#scramble').innerHTML = scramble;
    function shuffle(o) { //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
}

window.onerror = function (msg, url, linenumber) {
    console.log('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
}