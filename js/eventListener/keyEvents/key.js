// === KEY DOWN ===
document.addEventListener('keydown', handleKeydown);

document.addEventListener("keydown", e => {
    if (loadScreen.style.display == 'none') {
        if (timing) {
            if (e.key == 'Backspace') {
                e.preventDefault()
            }
            stop();
            return
        }
        if (e.key == 'Enter') {
            if (document.activeElement.id == 'comment') {
                document.activeElement.style.opacity = 0;
                document.activeElement.value = "";
                document.activeElement.blur();
                showToast('Added Comment', 2000);
                return;
            }
        }
        if (canChange) {
            if (!isNaN(parseInt(e.key))) {
                document.getElementById('comment').focus();
                document.getElementById('comment').style.opacity = 1;
            }
            if (e.key == 'SoftLeft') return allTimes[allTimes.length - 1].status = 'DNF', canChange = false, showToast('Changed Status to DNF  ', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            if (e.key == 'Enter') return canChange = false, setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            if (e.key == 'SoftRight') return allTimes[allTimes.length - 1].status = '+2', canChange = false, showToast('Changed Status to +2', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });

        }

        if (!timing) {
            if (e.key == 'SoftLeft') {
                if (session.style.display == 'block') {
                    session.style.display = 'none';
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                        middle: 'Session',
                        right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                    });
                    return
                }
            }

            if (e.key == 'SoftRight') {
                if (session.style.display == 'block') {
                    return openSessions();
                }
            }
            //Open/Close Settings
            if (e.key == 'SoftLeft') {
                if (settings.style.display == 'none') {
                    settings.style.display = 'block';
                    wholeSite.style.filter = 'blur(5px)';
                    document.getElementById('startKeyDiv').focus();
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2px; left: 2px">arrow_back</i>',
                        middle: 'Select',
                        right: '<i class="material-icons" style="font-size: 21px; position: relative; color: #44f;  top: 2px; right: 2px">question_mark</i>'
                    });
                    settingsOpened = true;
                } else if (settings.style.display == 'block' && document.getElementById('startKey').style.borderWidth !== '1px' && document.activeElement.id !== 'timerSize' && document.activeElement.id !== 'scrambleSizeInput') {
                    settings.style.display = 'none';
                    wholeSite.style.filter = 'none';
                    document.activeElement.blur();
                    document.getElementById('search').value = '';
                    search();
                    setSoftkey({
                        left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                        middle: 'Session',
                        right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
                    });
                    settingsOpened = false;
                }
            }


            //Quit App using SoftRight
            if (e.key == 'SoftRight' && !settingsOpened) return window.close();
            //Get info in settings
            if (e.key == 'SoftRight' && document.activeElement == timerSize) return timerSize.value = timerSize.value.slice(0, -1);
            if (e.key == 'SoftRight' && settingsOpened) return info();
            if (e.key == 'ArrowDown') return e.preventDefault();
        }
        //Timing
        if (e.key === startKeyName && !settingsOpened && document.activeElement.id !== 'comment') {
            spacedown = true;
            if (!spaceddown) {
                start();
            }
            spaceddown = true;
        }
        //Select in settings or new scramble
        if (e.key == 'Enter') {
            if (settingsOpened) return select();
            if (session.style.display == 'none') {
                session.style.display = 'block';
                loadTable();
                document.querySelector('.td').focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                    middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                    right: '<i class="material-icons" style="font-size: 25px; position: relative; top: 2.1px; right: 2px">list</i>'
                });
                return
            }
            if (document.getElementById('session').style.display == 'block') {
                document.getElementById('editTime').style.display = 'block';
                document.querySelector('#editTimeTime').focus();
            }

        }
        //Start Key changing in settings
        if (document.getElementById('startKey').style.borderWidth == '1px') {
            if (e.key != 'MicrophoneToggle' && e.key != 'Enter' && e.key != 'SoftLeft' && e.key != 'SoftRight' && e.key != 'Backspace' && e.key != 'EndCall')
                startKeyName = e.key;
            document.getElementById('startKey').value = e.key;
        }
    }
});



// ==== KEY UP ====
document.addEventListener("keyup", e => {
    spacedown = false;
    spaceddown = false;
    start();
    ready = false;
});