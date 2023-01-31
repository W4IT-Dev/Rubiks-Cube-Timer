document.addEventListener('keydown', e => {
    if(canChange) return
    if (e.key == 'SoftRight') {
        if (!settingsOpened && session.style.display != 'block') return window.close();
        if (document.activeElement == timerSize) return timerSize.value = timerSize.value.slice(0, -1);
        if (settingsOpened) return info();
        if (document.activeElement.classList.contains('notinput')) {
            lastFocused = document.activeElement;
            lastFocused.classList.add('selected')
            document.querySelector('#options').style.display = 'flex';
            document.querySelector('.option-button').focus();
            setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px">check</i>',
                right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px"></i>'
            });
        }
        if (session.style.display == 'block' && document.activeElement.classList.contains('time')) { 
            a = confirm('Are you sure you want to delete this time?');
            if (a) sessions[activeSession.index].times.splice(document.activeElement.id, 1);
            loadTable();
            // if (sessions[activeSession.index].times.length >= 5) calcAo5(); 
            // if (sessions[activeSession.index].times.length >= 12) calcAo12(); 
            document.querySelector('.td').focus();
            localStorage.sessions = JSON.stringify(sessions)
        }
    }
});
