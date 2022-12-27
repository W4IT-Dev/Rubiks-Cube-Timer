document.addEventListener('keydown', e => {
    if (e.key == 'SoftRight') {
        if (!settingsOpened && session.style.display != 'block') return window.close();
        if (document.activeElement == timerSize) return timerSize.value = timerSize.value.slice(0, -1);
        if (settingsOpened) return info();
        if (document.activeElement.classList.contains('notinput')) {
            if (sessions.length == 1) return alert("You can't delelte the last session!");
            a = confirm('Are you sure you want to delelte this session?');
            if (a) sessions.splice(document.activeElement.id, 1);
            localStorage.sessions = JSON.stringify(sessions);
            activeSession.index = 0;
            activeSession.name = sessions[0].name;
            document.querySelector('#sessionSelectDiv').innerHTML = `${activeSession.name}<span
                        class="material-icons">
                        expand_more
                    </span>`;
            document.querySelector('#sessionname').innerText = activeSession.name;
            loadSessions();
            loadTable();
            document.querySelector('.notinput').focus();
            return
        }
        if (session.style.display == 'block' && document.activeElement.classList.contains('time')) { 
            a = confirm('Are you sure you want to delete this session?');
            if (a) sessions[activeSession.index].times.splice(document.activeElement.id, 1);
            loadTable();
            document.querySelector('.td').focus();
        }
    }
});
