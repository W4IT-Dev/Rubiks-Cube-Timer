let spacedown = false;
let ready = false;
let time;
let timeIn100MS = 0;
let timing = false;
let waitToStart;

let tmeout;
let selectopened = false;

let canChange = false;

let sessions = [{
    name: "Session 1",
    times: [],

}];
let activeSession = { name: "Session 1", index: 0 };
let allAverages = {
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
let Ao5 = {
    ao5current: document.querySelector('#ao5current'),
    ao5best: document.querySelector('#ao5best'),
    ao5: document.querySelector('#ao5')
};

let Ao12 = {
    ao12current: document.querySelector('#ao12current'),
    ao12best: document.querySelector('#ao12best'),
    ao12: document.querySelector('#ao12')
};

let allelem = document.querySelectorAll('select, input, #editTime, #scrambleSizeInput, .divider, #options, .option-button, #resetButton, #resetSession, .dropdown-item, .dropdown-content, #dropDownButton, #comment, .scramble, #scramble, .setting, select, input, #timerBox, body, #settings, #softkeys, #session, td, th, #sessions, #divider, .line');

let settingsOpened = false;

let currentLoadedTimes = 30;
let table = document.getElementById("timestable");
let arrow = document.querySelector('#expandArrow')
let scrambleOnDom = document.querySelector('.scramble');
let actualScramble = document.querySelector('#scramble');
let timerBox = document.getElementById('timerBox');
let timer = document.getElementById('timer');
let first = document.getElementById('first');
let firstsecond = document.getElementById('seconds');
let tensecond = document.getElementById('tenseconds');
let minutes = document.getElementById('minutes');
let settings = document.getElementById('settings');
let puzzleType = document.getElementById('puzzleTypeDiv');
let puzzleTypeSelector = document.getElementById('puzzleType');
let timerFont = document.getElementById('timerFontDiv');
let timerFontSelector = document.getElementById('timerFont');
let session = document.querySelector('#session');
let sessionname = document.querySelector('#sessionnameatbutton');
let scrambleSizeDiv = document.querySelector('#scrambleSizeDiv');
let scrambleSize = document.querySelector('#scrambleSize')
let scrambleSizeInputDiv = document.querySelector('#scrambleSizeInputDiv');
let scrambleSizeInput = document.querySelector('#scrambleSizeInput')
let searchField = document.querySelector('#search');
let comment = document.querySelector('#comment');
let editTime = document.querySelector('#editTime');
let editTimeTime = document.querySelector('#editTimeTime');
let editTimeStatus = document.querySelector('#editTimeStatus');
let editTimeScramble = document.querySelector('#editTimeScramble');
let editTimeComment = document.querySelector('#editTimeComment');
let statusChange = document.querySelector('#statusChange');
let addPartDiv = document.querySelector('#addPartDiv');
let addPart = document.querySelector('#addPart');
let dropDownButton = document.querySelector('#dropDownButton');
let reset = document.querySelector('#resetSession');
let darkModeDiv = document.querySelector('#darkModeDiv');
let darkMode = document.querySelector('#darkMode');
let highContrastModeDiv = document.querySelector('#highContrastModeDiv');
let highContrastMode = document.querySelector('#highContrastMode')
let lastFocused;
let adDisplaying = false;

let autoFontSize = true;
let scrambleFontSize = "17px";

let currentLoadedScrambles = 0;
let solves = 0;

var moves = new Array();
var limit = 20;
var keys = "";

let allSelectElems = document.querySelectorAll('select');