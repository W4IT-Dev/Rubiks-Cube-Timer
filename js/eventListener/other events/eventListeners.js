puzzleTypeSelector.addEventListener('change', () => {
    setPuzzleType();
});

timerFontSelector.addEventListener('change', () => {
    timer.style.fontFamily = timerFontSelector.value;
    localStorage.fontFamily = timerFontSelector.value;
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

reset.onfocus = () => {
    setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2px; left: 2px">arrow_back</i>',
        middle: 'Select',
        right: ''
    });
}
reset.addEventListener('click', () => {
    a = confirm("Are you sure you wan't to delete this session's times?");
    if (!a) return
    {
        sessions[activeSession.index].times = [];
        allAverages.currents.single = '-'
        allAverages.currents.mo3 = '-'
        allAverages.currents.ao5 = '-'
        allAverages.currents.ao12 = '-'
        allAverages.currents.ms.single = '-'
        allAverages.currents.ms.mo3 = '-'
        allAverages.currents.ms.ao5 = '-'
        allAverages.currents.ms.ao12 = '-'
        allAverages.bests.single = '-'
        allAverages.bests.mo3 = '-'
        allAverages.bests.ao5 = '-'
        allAverages.bests.ao12 = '-'
        allAverages.bests.ms.single = '-'
        allAverages.bests.ms.mo3 = '-'
        allAverages.bests.ms.ao5 = '-'
        allAverages.bests.ms.ao12 = '-'
    }
    localStorage.sessions = JSON.stringify(sessions);
    showToast(`Reseted ${sessions[activeSession.index].name} succesfully`, 1000), loadTable();
});

window.addEventListener('error', e => {
    console.error(e)
    showToast(e.message, 1300);
})

document.querySelector('.dropdown-item').addEventListener('focus', () => {
    if (selectopened) { e = 'expand_less' } else { e = 'expand_more' };
    setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">' + e + '</i>',
        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px"></i>'
    });
});

document.querySelector('#newsessioninput').addEventListener('focus', () => {
    setSoftkey({
        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
        middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">add</i>',
        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">delete</i>'
    });
});

document.querySelector('#delete').addEventListener('click', () => {
    if (sessions.length == 1) return showToast("Error <br> You can't delete the last session!", 1800);
    a = confirm('Are you sure you want to delete this session?');
    if (!a) return
    sessions.splice(document.querySelector('.selected').id, 1);
    localStorage.sessions = JSON.stringify(sessions);
    activeSession.index = 0;
    activeSession.name = sessions[0].name;
    localStorage.activeSession = JSON.stringify(activeSession);
    sessionname.innerText = activeSession.name;
    document.querySelector('#sessionname').innerText = activeSession.name;
    loadSessions();
    loadTable();
    document.querySelector('.notinput').focus();
    document.querySelector('#options').style.display = 'none';
    lastFocused = document.querySelector('.notinput');
});

document.querySelector('#rename').addEventListener('click', () => {
    let idx = document.querySelector('.selected').id;
    let a = prompt(`Please enter a new name for the session "${sessions[idx].name}"`);
    if (!a || /^\s+$/.test(a)) return showToast('Error! <br> Something went wrong', 2300);
    sessions[idx].name = a;
    activeSession.name = sessions[idx].name;
    loadSessions();
    document.querySelectorAll('.notinput')[idx--].focus();
    document.querySelector('#options').style.display = 'none';
    document.querySelector('#sessionname').innerText = activeSession.name;
    sessionname.innerText = activeSession.name;

    localStorage.sessions = JSON.stringify(sessions);
    localStorage.activeSession = JSON.stringify(activeSession)
});