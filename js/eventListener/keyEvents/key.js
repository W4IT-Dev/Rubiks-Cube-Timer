document.addEventListener("keydown", e => {
    handleKeydown(e);
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
            if (e.key == 'SoftLeft') return clearTimeout(bacjankdakhkdakdiuadkkj), sessions[activeSession.index].times[0].status = 'DNF', canChange = false, showToast('Changed Status to DNF  ', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            //Add OK
            if (e.key == 'Enter') return clearTimeout(bacjankdakhkdakdiuadkkj), canChange = false, setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
            //Add +2
            if (e.key == 'SoftRight') return clearTimeout(bacjankdakhkdakdiuadkkj), sessions[activeSession.index].times[0].status = '+2', canChange = false, showToast('Changed Status to +2', 2000), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">settings</i>',
                middle: 'Session',
                right: '<i class="material-icons" style="font-size: 21px; color: red;position: relative; top: 2.5px; right: 2px">logout</i>'
            });
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
        //Start Key changing in settings
        if (startKey.style.borderWidth == '1px') {
            if (e.key != 'MicrophoneToggle' && e.key != 'Enter' && e.key != 'SoftLeft' && e.key != 'SoftRight' && e.key != 'Backspace' && e.key != 'EndCall') {
                startKeyName = e.key;
                startKey.value = e.key;
            }
            return
        }
        //Timing
        if (e.key === startKeyName && document.activeElement == document.body) {
            spacedown = true;
            start();
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