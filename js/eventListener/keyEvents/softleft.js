document.addEventListener('keydown', e => {
    if (!canChange) {

        if (e.key == 'SoftLeft') {
            if (document.querySelector('#options').style.display == 'flex') return document.querySelector('#options').style.display = 'none', lastFocused.focus(), lastFocused.classList.remove('selected'), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px">check</i>',
                right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">more_horiz</i>'
            });
            if (editTime.style.display == 'block') return editTime.style.display = 'none', lastFocused.focus(), setSoftkey({
                left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px; left: 2px">arrow_back</i>',
                middle: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.5px;">edit</i>',
                right: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2.1px; right: 2px">delete</i>'
            });
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
                puzzleType.focus();
                setSoftkey({
                    left: '<i class="material-icons" style="font-size: 21px; position: relative; top: 2px; left: 2px">arrow_back</i>',
                    middle: 'Select',
                    right: '<i class="material-icons" style="font-size: 21px; position: relative; color: #44f;  top: 2px; right: 2px">question_mark</i>'
                });
                settingsOpened = true;
                return;
            }
            if (settings.style.display == 'block' && document.activeElement.id !== 'timerSize' && document.activeElement.id !== 'scrambleSizeInput') {
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
    }
});