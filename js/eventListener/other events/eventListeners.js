puzzleTypeSelector.addEventListener('change', () => {
    setPuzzleType();
});

document.getElementById('timerSize').addEventListener('input', () => {
    timer.style.fontSize = document.getElementById('timerSize').value + 'px';
    localStorage['timerSize'] = document.getElementById('timerSize').value;
});

scrambleSize.addEventListener('change', () => {
    if (scrambleSize.value == 'auto') {
        scrambleSizeInputDiv.classList.remove('show', 'nos');
        autoFontSize = true;
        actualScramble.style.fontSize = scrambleFontSize;
        localStorage['scrambleSize'] = 'auto'
        return
    }
    scrambleSizeInputDiv.classList.add('show', 'nos'); autoFontSize = false;
    actualScramble.style.fontSize = scrambleSizeInput.value + "px";
    localStorage['scrambleSize'] = 'user'
});
scrambleSizeInput.addEventListener('input', () => {
    actualScramble.style.fontSize = scrambleSizeInput.value + "px";
    localStorage['scrambleSizeInput'] = scrambleSizeInput.value;

})
searchField.addEventListener('input', search);

allSelectElems.forEach(function (elem) {
    elem.addEventListener('blur', () => {
        document.getElementById(elem.parentElement.id).focus();
    });
});

reset.addEventListener('click', () => {
    a = confirm("Are you sure you wan't to delete this session's times?\nThis can NOT be undone.");
    if (!a) return
    sessions[activeSession.index].times = [];
    localStorage['sessions'] = JSON.stringify(sessions);
    showToast('Deleted', 1000), loadTable();
});


window.addEventListener('error', e => {
    console.error(e)
})

document.querySelector('.dropdown-item').addEventListener('focus', () => {
    if (selectopened) { e = 'expand_less' } else { e = 'expand_more' };
    setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">' + e + '</i>',
        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">delete</i>'
    });
});


everydrpdwnitm.forEach((item) => {
    item.addEventListener('focus', () => {
        setSoftkey({
            left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
            middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">check</i>',
            right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">delete</i>'
        });
    });
});

everytd.forEach((item) => {
    item.addEventListener('focus', () => {
        setSoftkey({
            left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
            middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">edit</i>',
            right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">delete</i>'
        });
    });
});