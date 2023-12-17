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
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
}

function addTime(time, status, scramble, comment, fromTimer) {
    times.unshift({
        time: time,
        status: status,
        scramble: scramble,
        comment: comment
    });
    localforage.setItem('times', times).then(function () {
        return localforage.getItem('times');
    }).then(function (value) {
        // console.log(value)
        // we got our value
    }).catch(function (err) {
        // we got an error
        console.log(err)
    });
    if (!fromTimer || times.length < 2) return
    difference = times[0].time - times[1].time
    if (difference < 0) {
        difference *= -1;
        timerContainer.title = '(-' + convertTime(difference) + ')'
        timerContainer.style.setProperty('--color', 'green');
    } else if (difference > 0) {
        timerContainer.title = '(+' + convertTime(difference) + ')'
        timerContainer.style.setProperty('--color', 'red');
    } else {
        timerContainer.title = '(0.0)'
        timerContainer.style.setProperty('--color', 'unset');
    }
}

function calcAvg(amount, oneAvg, index) {
    if (times.length < amount)
        return "Not enough time entries to calcualte average of " + amount;
    if (!oneAvg) {
        let averages = [];
        for (let i = 0; i < times.length; i++) {
            if (i >= amount - 1) {
                let timesForAvg = times
                    .slice(i - amount + 1, i + 1)
                    .map((timeObj) => timeObj.time);

                timesForAvg.sort((a, b) => a - b);
                timesForAvg = timesForAvg.slice(1, timesForAvg.length - 1);

                if (timesForAvg.length === 0) {
                    averages.unshift("No valid times");
                } else {
                    averages.unshift(
                        parseInt(
                            timesForAvg.reduce((sum, currentValue) => sum + currentValue, 0) /
                            timesForAvg.length
                        )
                    );
                }
            }
        }
        return averages;
    }
    let timesForAvg = times
        .slice(index, index + amount)
        .map((timeObj) => timeObj.time);

    timesForAvg.sort((a, b) => a - b);
    timesForAvg = timesForAvg.slice(1, timesForAvg.length - 1);

    return parseInt(timesForAvg.reduce((sum, currentValue) => sum + currentValue, 0) / timesForAvg.length);
}
function convertTime(tenths, doubleZero) {
    const tenthsPerSecond = 10;
    const tenthsPerMinute = 10 * 60;
    const tenthsPerHour = 10 * 60 * 60;

    const hours = Math.floor(tenths / tenthsPerHour);
    const minutes = Math.floor((tenths / tenthsPerMinute) % 60);
    const seconds = Math.floor((tenths / tenthsPerSecond) % 60);
    const tenthsRemaining = tenths % tenthsPerSecond;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${tenthsRemaining.toString().padStart(2, '0')}`;
    } else if (minutes > 0) {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${tenthsRemaining.toString().padStart(2, '0')}`;
    } else if (doubleZero) {
        return `${seconds.toString().padStart(2, '0')}.${tenthsRemaining}`;
    } else {
        return `${seconds}.${tenthsRemaining}`;

    }
}