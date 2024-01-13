document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        if (document.activeElement.id === 'comment') {
            comment.style.opacity = 0;
            if (comment.value) {
                sessions[activeSession.index].times[0].comment = comment.value;
                comment.value = "";
                showToast('Added Comment', 2000);
                localStorage.sessions = JSON.stringify(sessions);
            }
            comment.blur();
            return;
        }
        if (!canChange) {
            if (settingsOpened) return select();
            if (session.style.display === 'none' && !timing) {
                loadTable();
                session.style.display = 'block';
                document.querySelectorAll('.td')[0].focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                    middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                    right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
                });
                return;
            }
            if (session.style.display === 'block') {
                if (document.activeElement.id === "loadMore") {
                    const e = darkMode.checked ? 'dark' : 'light';
                    console.log('test');
                    if (sessions[activeSession.index].times[currentLoadedScrambles + 30]) {
                        for (let i = currentLoadedScrambles; i < currentLoadedScrambles + 30; i++) {
                            insertTime(i);
                        }
                        cell22 = row.insertCell(1);
                        cell22.classList.add(e);
                        cell11.id = 'loadMore';
                        cell22.innerHTML = `${sessions[activeSession.index].times.length - currentLoadedScrambles} more`;
                        cell11.classList.add("td", "times", e);
                        cell11.innerHTML = `Load more`;
                        currentLoadedScrambles += 30;
                    } else {
                        for (let i = currentLoadedScrambles; i < currentLoadedScrambles.length; i++) {
                            insertTime(i);
                        }
                    }
                    return;
                }
                if (editTime.style.display == "block") {
                    if (document.activeElement == editTimeStatus) return editTimeStatusSelector.focus(), console.log(editTimeStatusSelector.value);
                    if (document.activeElement == editTimeComment) return alert('SAVE comment')
                    alert('E    ')
                }
                if (document.activeElement === dropDownButton) return
                if (document.activeElement.id === 'newsessioninput') {
                    // check if emptry string
                    if (!document.activeElement.value || /^\s+$/.test(document.activeElement.value)) return showToast('Please input a name for the session', 1600);
                    // add new session
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
                            }
                        }
                    });
                    // update active session
                    activeSession.name = document.querySelector('#newsessioninput').value;
                    activeSession.index = sessions.map(e => e.name).indexOf(activeSession.name);
                    localStorage.activeSession = JSON.stringify(activeSession);
                    // load new
                    loadTable();
                    loadSessions();
                    document.querySelectorAll('.td')[0].focus();
                    document.getElementById("myDropdown").classList.toggle("showing");
                    selectopened = false;
                    sessionname.innerText = activeSession.name;
                    document.querySelector('#sessionname').innerText = sessions[activeSession.index].name;
                    showToast('Added Session', 1500);
                    localStorage.sessions = JSON.stringify(sessions);
                    session.style.overflow = 'auto';
                    updateAvg('reset');
                    document.querySelector('#newsessioninput').value = '';
                    return;
                }
                if (document.activeElement.classList.contains('notinput')) {
                    activeSession.name = document.activeElement.innerText;
                    activeSession.index = sessions.map(e => e.name).indexOf(activeSession.name);
                    localStorage.activeSession = JSON.stringify(activeSession);
                    sessionname.innerText = activeSession.name;
                    document.querySelector('#sessionname').innerText = activeSession.name;
                    loadTable();
                    document.querySelectorAll('.td')[0].focus();
                    document.getElementById("myDropdown").classList.toggle("showing");
                    selectopened = false;
                    allAverages = {
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
                    };
                    Ao5.timeInMS = '-'
                    Ao12.timeInMS = '-'
                    calcAvg(5, false);
                    calcAvg(12, false);
                    session.style.overflow = 'auto';
                    return;
                }

                if (document.activeElement.classList.contains('time')) {
                    lastFocused = document.activeElement;
                    editTimeTime.innerHTML = `Time: ${document.activeElement.parentElement.firstChild.innerText}`;
                    editTimeStatus.innerHTML = `Status: ${document.activeElement.parentElement.children[1].innerText}`;
                    editTimeStatus.innerHTML = `
                        <label tabindex="1"  for="statusChange">Status:</label>
                        <select id="statusChange" name="statusChange">
                            <option value="OK">OK</option>
                            <option value="DNF">DNF</option>
                            <option value="+2">+2</option>
                        </select>
                `
                    editTimeStatusSelector.value = document.activeElement.parentElement.children[1].innerText
                    console.log(document.activeElement.parentElement.children[1].innerText)
                    editTimeScramble.innerHTML = `Scramble: <br> ${document.activeElement.parentElement.children[2].innerText}`;
                    editTimeComment.value = document.activeElement.parentElement.children[3].innerText;
                    editTime.style.display = 'block';
                    editTimeTime.focus();
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                        middle: '',
                        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
                    });
                }
                if (document.activeElement === editTimeScramble) {
                    if (editTimeScramble.style.maxHeight === '90px') {
                        editTimeScramble.style.maxHeight = "1000px";
                        editTimeScramble.style.overflow = 'visible';
                    } else {
                        editTimeScramble.style.maxHeight = "90px";
                        editTimeScramble.style.overflow = 'hidden';
                    }
                }
            }
        }
    }
});