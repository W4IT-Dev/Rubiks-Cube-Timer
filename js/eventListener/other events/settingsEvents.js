puzzleTypeSelector.addEventListener('change', () => {
    if (puzzleTypeSelector.value == "2x2") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['f'] = new Array("F", "F'", "F2");
        keys = new Array("r", "u", "f");
        limit = 9;
        scrambleFontSize = "20px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '20px';
        }
        return getScramble();
    }
    if (puzzleTypeSelector.value == "3x3") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        keys = new Array("r", "l", "u", "d", "f", "b");
        limit = 20;
        scrambleFontSize = "18px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '18px';
        }
        return getScramble();
    }
    if (puzzleTypeSelector.value == "4x4") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("B", "B'", "B2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw");
        limit = 46;
        scrambleFontSize = "17px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '17px';
        }
        return getScramble();
    }
    if (puzzleTypeSelector.value == "5x5") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("B", "B'", "B2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw");
        limit = 60;
        scrambleFontSize = "16px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '16px';
        }
        return getScramble();
    }
    if (puzzleTypeSelector.value == "6x6") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("Bw", "Bw'", "Bw2");
        moves['3Rw'] = new Array("3Rw", "3Rw'", "3Rw2");
        moves['3Lw'] = new Array("3Lw", "3Lw'", "3Lw2");
        moves['3Uw'] = new Array("3Uw", "3Uw'", "3Uw2");
        moves['3Dw'] = new Array("3Dw", "3Dw'", "3Dw2");
        moves['3Fw'] = new Array("3Fw", "3Fw'", "3Fw2");
        moves['3Bw'] = new Array("3Bw", "3Bw'", "3Bw2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw", "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw");
        limit = 80;
        scrambleFontSize = "15px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '15px';
        }
        return getScramble();
    }
    if (puzzleTypeSelector.value == "7x7") {
        moves = new Array();
        moves['r'] = new Array("R", "R'", "R2");
        moves['l'] = new Array("L", "L'", "L2");
        moves['u'] = new Array("U", "U'", "U2");
        moves['d'] = new Array("D", "D'", "D2");
        moves['f'] = new Array("F", "F'", "F2");
        moves['b'] = new Array("B", "B'", "B2");
        moves['Rw'] = new Array("Rw", "Rw'", "Rw2");
        moves['Lw'] = new Array("Lw", "Lw'", "Lw2");
        moves['Uw'] = new Array("Uw", "Uw'", "Uw2");
        moves['Dw'] = new Array("Dw", "Dw'", "Dw2");
        moves['Fw'] = new Array("Fw", "Fw'", "Fw2");
        moves['Bw'] = new Array("Bw", "Bw'", "Bw2");
        moves['3Rw'] = new Array("3Rw", "3Rw'", "3Rw2");
        moves['3Lw'] = new Array("3Lw", "3Lw'", "3Lw2");
        moves['3Uw'] = new Array("3Uw", "3Uw'", "3Uw2");
        moves['3Dw'] = new Array("3Dw", "3Dw'", "3Dw2");
        moves['3Fw'] = new Array("3Fw", "3Fw'", "3Fw2");
        moves['3Bw'] = new Array("3Bw", "3Bw'", "3Bw2");
        keys = new Array("r", "Rw", "l", "Lw", "u", "Uw", "d", "Dw", "f", "Fw", "3Rw", "3Lw", "3Uw", "3Dw", "3Fw", "3Bw");
        limit = 100;
        scrambleFontSize = "14px";
        if (autoFontSize) {
            document.querySelector('#scramble').style.fontSize = '14px';
        }
        return getScramble();
    }
});

document.getElementById('timerSize').addEventListener('input', () => {
    timer.style.fontSize = document.getElementById('timerSize').value + 'px';
});

scrambleSize.addEventListener('change', () => {
    if (scrambleSize.value == 'auto') {
        scrambleSizeInputDiv.classList.remove('show', 'nos');
        autoFontSize = true;
        actualScramble.style.fontSize = scrambleFontSize;
        return
    }
    scrambleSizeInputDiv.classList.add('show', 'nos'); autoFontSize = false;
    actualScramble.style.fontSize = scrambleSizeInput.value + "px";
});
scrambleSizeInput.addEventListener('input', () => {
    actualScramble.style.fontSize = scrambleSizeInput.value + "px";
})
searchField.addEventListener('input', search);

allSelectElems.forEach(function (elem) {
    elem.addEventListener('blur', () => {
        document.getElementById(elem.parentElement.id).focus();
    });
});