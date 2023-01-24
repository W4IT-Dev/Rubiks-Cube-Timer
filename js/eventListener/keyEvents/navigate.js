document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        if (document.activeElement == document.querySelector('.td')) return dropDownButton.focus();

        if (document.activeElement.classList.contains('setting')) return nav(-1, "." + document.activeElement.classList[0] + ".show");

        nav(-1, "." + document.activeElement.classList[0]);
    }

    if (e.key === 'ArrowDown') {
        if (document.activeElement == dropDownButton && !selectopened || document.activeElement == reset) return document.querySelector('.td').focus();

        if (document.activeElement.classList.contains('setting')) return nav(1, "." + document.activeElement.classList[0] + ".show");

        nav(1, "." + document.activeElement.classList[0]);
    }

    if (e.key === 'ArrowRight') {
        if (document.activeElement == dropDownButton && !selectopened) return document.querySelector('#resetSession').focus();
    }

    if (e.key === 'ArrowLeft') {
        if (document.activeElement == reset) return dropDownButton.focus();
    }
})