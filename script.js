
function getScramble() {//scramble generator
    var moves = new Array();
    moves['r'] = new Array("R", "R'", "R2");
    moves['l'] = new Array("L", "L'", "L2");
    moves['u'] = new Array("U", "U'", "U2");
    moves['d'] = new Array("D", "D'", "D2");
    moves['f'] = new Array("F", "F'", "F2");
    moves['b'] = new Array("B", "B'", "B2");

    var limit = 25;
    var last = "";
    var scrambleAlg = "";
    var keys = "";

    for (var i = 1; i <= limit; i++) {
        keys = new Array("r", "l", "u", "d", "f", "b");
        shuffle(keys);
        while (last == keys[0]) {
            shuffle(keys);
        }
        shuffle(moves[keys[0]]);
        move = moves[keys[0]][0];
        scrambleAlg += move + " ";
        last = keys[0];
    }
    scramble.innerHTML = scrambleAlg;
    function shuffle(o) { //v1.0
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
}

window.onerror = function (msg, url, linenumber, a, b) {
    console.log('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber + ' Type: ' + a + b);
    return true;
}

