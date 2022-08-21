function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.body.style.backgroundColor = "rgb(100, 0, 0)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "#dd0000";
}
let open = false;
document.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        if (open) return closeNav(), open = false;
        openNav(), open = true, document.getElementById('first').focus();
    }
});
document.addEventListener('keydown', handleKeydown);
document.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        console.log('ayo');
    }
})
function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            nav(-1);
            break;
        case 'ArrowDown':
            nav(1);
            break;
    }
}
function nav(move) {
    const currentIndex = document.activeElement.tabIndex;
    const next = currentIndex + move;
    const items = document.querySelectorAll('.option');
    const targetElement = items[next];
    /*
    if (move === 1 && currentIndex == items.length - 1) return items[0].focus();
    if (move === -1 && currentIndex == 0) return items[items.length - 1].focus();
        probably not using this
    */
    targetElement.focus();
}