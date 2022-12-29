document.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        // ==== ADD COMMENT ====
        if (document.activeElement.id == 'comment') {
            document.activeElement.style.opacity = 0;
            sessions[activeSession.index].times[0].comment = document.activeElement.value;
            document.activeElement.value = "";
            document.activeElement.blur();
            localStorage.sessions = JSON.stringify(sessions);
            showToast('Added Comment', 2000);
            return;
        }
        if (canChange) return
        if (settingsOpened) return select();
        if (session.style.display == 'none') {
            session.style.display = 'block';
            loadTable();
            document.querySelectorAll('.td')[0].focus();
            setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
            });
            return
        }
        if (session.style.display == 'block' && editTime.style.display == 'none' && document.activeElement !== dropDownButton) {
            if (document.activeElement.id == 'newsessioninput') {
                if (!document.activeElement.value) return showToast('Please input a name for the session', 1600);
                sessions.push({
                    name: document.querySelector('#newsessioninput').value,
                    times: [],
                    averages: {
                        currents: {
                            single: '-',
                            mo3: '-',
                            ao5: '-',
                            ao12: '-',
                            ms: {
                                single: '-',
                                mo3: '-',
                                ao5: '-',
                                ao12: '-'
                            }
                        },
                        bests: {
                            single: '-',
                            mo3: '-',
                            ao5: '-',
                            ao12: '-',
                            ms: {
                                single: '-',
                                mo3: '-',
                                ao5: '-',
                                ao12: '-'
                            }
                        }
                    }
                });
                activeSession.name = document.querySelector('#newsessioninput').value;
                activeSession.index = sessions.map(function (e) { return e.name; }).indexOf(activeSession.name);
                localStorage.activeSession = JSON.stringify(activeSession);
                loadTable();
                document.querySelector('#newsessioninput').value = '';
                loadSessions();
                document.querySelectorAll('.td')[0].focus();
                document.getElementById("myDropdown").classList.toggle("showing");
                selectopened = false;
                dropDownButton.innerHTML = `${activeSession.name}<span
                        class="material-icons" ">
                        expand_more
                    </span>`;
                document.querySelector('#sessionname').innerText = activeSession.name;
                showToast('Added Session', 1500)
                localStorage.sessions = JSON.stringify(sessions);
                Ao5.ao5current.innerHTML = '-';
                Ao5.ao5best.innerHTML = '-';
                Ao12.ao12current.innerHTML = '-';
                Ao12.ao12best.innerHTML = '-';
                Ao5.ao5.innerText = 'Ao5: -'
                return;
            }
            if (document.activeElement.classList.contains('notinput')) {
                activeSession.name = document.activeElement.innerText;
                activeSession.index = sessions.map(function (e) { return e.name; }).indexOf(activeSession.name);
                localStorage.activeSession = JSON.stringify(activeSession);
                dropDownButton.innerHTML = `${activeSession.name}<span
                        class="material-icons" >
                        expand_more
                    </span>`;
                document.querySelector('#sessionname').innerText = activeSession.name;
                loadTable();
                document.querySelectorAll('.td')[0].focus();
                document.getElementById("myDropdown").classList.toggle("showing");
                selectopened = false;
                if (sessions[activeSession.index].times.length >= 5) {
                    calcAo5();
                } else {
                    Ao5.ao5current.innerHTML = '-';
                    Ao5.ao5best.innerHTML = '-';
                    Ao5.ao5.innerText = 'Ao5: -'
                }
                if (sessions[activeSession.index].times.length >= 12) {
                    calcAo12();
                } else {
                    Ao12.ao12current.innerHTML = '-';
                    Ao12.ao12best.innerHTML = '-';
                    Ao12.ao12.innerText = 'Ao12: -'
                }
                return
            }
            if (document.activeElement.classList.contains('time')) {
                lastFocused = document.activeElement;
                editTimeTime.innerHTML = `Time: ${document.activeElement.parentElement.firstChild.innerText}`
                editTimeStatus.innerHTML = `Status: ${document.activeElement.parentElement.children[1].innerText}`
                editTimeScramble.innerHTML = `Scramble: <br> ${document.activeElement.parentElement.children[2].innerText}`
                editTimeComment.value = document.activeElement.parentElement.children[3].innerText;
                editTime.style.display = 'block';
                editTimeTime.focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                    middle: '',
                    right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
                });
            }
            if (document.activeElement = editTimeScramble) {
                if (editTimeScramble.style.maxHeight == '90px') return editTimeScramble.style.maxHeight = "1000px", editTimeScramble.style.overflow = 'visible';
                editTimeScramble.style.maxHeight = '90px';
                editTimeScramble.style.overflow = 'hidden'
            }
        }
    }
});