let spacedown = false;
let ready = false;
let time;
let timeIn100MS = 0;
let timing = false;
let waitToStart;
let startKeyName = '5';

let bacjankdakhkdakdiuadkkj;
let selectopened = false;

let canChange = false;

let sessions = [
    {
        name: "Session 1",
        times: []
    }
];
let activeSession = { name: "Session 1", index: 0 };
let allTimes = [];
let Ao5 = {
    current: 0,
    currentMS: 0,
    best: 0,
    bestMS: 0,
    ao5current: document.querySelector('#ao5current'),
    ao5best: document.querySelector('#ao5best'),
    ao5: document.querySelector('#ao5')
};

let Ao12 = {
    current: 0,
    currentMS: 0,
    best: 0,
    bestMS: 0,
    ao12current: document.querySelector('#ao12current'),
    ao12best: document.querySelector('#ao12best'),
    ao12: document.querySelector('#ao12')
};

let everydrpdwnitm = document.querySelectorAll('.notinput');
let everytd = document.querySelectorAll('td')
let allelem = document.querySelectorAll('#resetButton, #resetSession, .dropdown-item, .dropbtn #comment, .scramble, #scramble, .setting, select, input, #timerBox, body, #settings, #softkeys, #session, td, th, #sessions, #divider, .line');

let settingsOpened = false;

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
let scrambleSizeDiv = document.querySelector('#scrambleSizeDiv');
let scrambleSize = document.querySelector('#scrambleSize')
let scrambleSizeInputDiv = document.querySelector('#scrambleSizeInputDiv');
let scrambleSizeInput = document.querySelector('#scrambleSizeInput')
let searchField = document.querySelector('#search');
let comment = document.querySelector('#comment');
let startKeyDiv = document.querySelector('#startKeyDiv');
let editTime = document.querySelector('#editTime');
let editTimeTime = document.querySelector('#editTimeTime');
let editTimeStatus = document.querySelector('#editTimeStatus');
let editTimeScramble = document.querySelector('#editTimeScramble');
let editTimeComment = document.querySelector('#editTimeComment');
let statusChange = document.querySelector('#statusChange');
let startKey = document.querySelector('#startKey');
let addPartDiv = document.querySelector('#addPartDiv');
let addPart = document.querySelector('#addPart');
let sessionSelectDiv = document.querySelector('#sessionSelectDiv');
let reset = document.querySelector('#resetSession');

let lastFocused;

let autoFontSize = true;
let scrambleFontSize = "17px";

var moves = new Array();
var limit = 20;
var keys = "";

let allSelectElems = document.querySelectorAll('select');