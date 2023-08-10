function addTime(time, status, scramble, comment, fromTimer) {
    times.unshift({
        time: time,
        status: status,
        scramble: scramble,
        comment: comment
    });
    if (!fromTimer || times.length < 2) return
    difference = times[0].time - times[1].time
    if (difference < 0) {
        difference *= -1;
        timerContainer.title = '-' + convertMS(difference)
        timerContainer.style.setProperty('--color', 'green');
    } else {
        timerContainer.title = '+' + convertMS(difference)
        timerContainer.style.setProperty('--color', 'red');
    }
}