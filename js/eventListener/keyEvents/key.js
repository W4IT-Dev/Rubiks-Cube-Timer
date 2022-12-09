// === KEY DOWN ===
document.addEventListener('keydown', handleKeydown);

document.addEventListener("keydown", e => {
    if (loadScreen.style.display == 'none' && !spacedown) {
        // === STOP TIME ===
        if (timing) {
            if (e.key == 'Backspace') {
                e.preventDefault();
            }
            stop();
            return
        }

        // === CHANGE LATEST TIME'S STATUS ===
        if (canChange) {
            // Focus Comment
            if (!isNaN(parseInt(e.key))) {
                comment.focus();
                comment.style.opacity = 1;
            }
            //Add DNF
            if (e.key == 'SoftLeft') return allTimes[0].status = 'DNF', canChange = false, showToast('Changed Status to DNF  ', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            //Add OK
            if (e.key == 'Enter') return canChange = false, setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            //Add +2
            if (e.key == 'SoftRight') return allTimes[0].status = '+2', canChange = false, showToast('Changed Status to +2', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });

        }

        // ==== ENTER ====
        if (e.key == 'Enter') {
            // ==== ADD COMMENT ====
            if (document.activeElement.id == 'comment') {
                document.activeElement.style.opacity = 0;
                document.activeElement.value = "";
                document.activeElement.blur();
                showToast('Added Comment', 2000);
                return;
            }
            // ====  ====
            if (settingsOpened) return select();
            if (session.style.display == 'none') {
                session.style.display = 'block';
                loadTable();
                document.querySelector('.td').focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                    middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                    right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
                });
                return
            }
            if (session.style.display == 'block' && editTime.style.display == 'none') {
                lastFocused = document.activeElement;
                editTimeTime.innerHTML = `Time: ${document.activeElement.parentElement.firstChild.innerText}`
                editTimeStatus.innerHTML = `Status: ${document.activeElement.parentElement.children[1].innerText}`
                editTimeScramble.innerHTML = `Scramble: <br> ${document.activeElement.parentElement.children[2].innerText}`
                editTimeComment.value = document.activeElement.parentElement.children[3].innerText
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
            if (document.activeElement == editTimeStatus) {
                allBtns = document.querySelectorAll('.editBtn');
                if (statusChange.style.display == 'flex') {
                    statusChange.style.display = 'none';
                    allBtns.forEach(btn => {
                        btn.classList.remove('show');
                    });
                } else {
                    statusChange.style.display = 'flex';
                    allBtns.forEach(btn => {
                        btn.classList.add('show')
                    });
                }
            }
        }
        // ==== SOFTLEFT ====
        if (e.key == 'SoftLeft') {
            if (editTime.style.display == 'block') return editTime.style.display = 'none', setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
            }), lastFocused.focus();
            if (session.style.display == 'block') {
                session.style.display = 'none';
                document.activeElement.blur();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                    middle: 'Session',
                    right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                });
                return
            }
            if (settings.style.display == 'none') {
                settings.style.display = 'block';
                wholeSite.style.filter = 'blur(5px)';
                startKeyDiv.focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2px; left: 2px">arrow_back</i>',
                    middle: 'Select',
                    right: '<i class="material-icons" style="font-size: 21px; position: relative; color: #44f;  top: 2px; right: 2px">question_mark</i>'
                });
                settingsOpened = true;
            } else if (settings.style.display == 'block' && startKeyDiv.style.borderWidth !== '1px' && document.activeElement.id !== 'timerSize' && document.activeElement.id !== 'scrambleSizeInput') {
                settings.style.display = 'none';
                wholeSite.style.filter = 'none';
                document.activeElement.blur();
                searchField.value = '';
                search();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                    middle: 'Session',
                    right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                });
                settingsOpened = false;
            }
        }
        // ==== SOFTRIGHT ====
        if (e.key == 'SoftRight') {
            if (session.style.display == 'block') {
                allTimes = [];
                localStorage['allTimes'] = JSON.stringify(allTimes);
                showToast('Deleted', 1000), loadTable();
                document.querySelectorAll('.td')[0].focus();
                // console.log(document.activeElement.parentElement.children[2].innerText);
                // console.log(document.querySelector("#" + document.activeElement.id + ": nth - child(3)").innerText);
                // allTimes.filter(time => time.scramble != document.activeElement.parentElement.children[2].innerText)
            }
            if (!settingsOpened && session.style.display != 'block') return window.close();
            if (document.activeElement == timerSize) return timerSize.value = timerSize.value.slice(0, -1);
            if (settingsOpened) return info();
        }

        if (!timing) {
            if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
                if (document.activeElement == editTimeTime || document.activeElement == editTimeScramble) {
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                        middle: '',
                        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
                    });
                }
                if (document.activeElement == editTimeStatus) {
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                        middle: 'Select',
                        right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
                    });
                }
            }
            if (settings.style.display == 'none' && session.style.display == 'none') {
                if (e.key == 'ArrowDown') return scrambleOnDom.style.maxHeight = '280px';
                scrambleOnDom.style.maxHeight = '100px';
            }

        }
        //Timing
        if (e.key === startKeyName && document.activeElement == document.body) {
            spacedown = true;
            start();
        }
        //Start Key changing in settings
        if (startKey.style.borderWidth == '1px') {
            if (e.key != 'MicrophoneToggle' && e.key != 'Enter' && e.key != 'SoftLeft' && e.key != 'SoftRight' && e.key != 'Backspace' && e.key != 'EndCall')
                startKeyName = e.key;
            startKey.value = e.key;
        }
    }
});

// ==== KEY UP ====
document.addEventListener("keyup", () => {
    clearTimeout(waitToStart)
    spacedown = false;
    start();
    ready = false;
});