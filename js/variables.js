let spacedown = false;
let spaceddown = false;
let ready = false;
let time;
let timing = false;
let startKeyName = '5';

let canChange = false;

let allTimes = [];

let allelem = document.querySelectorAll('#resetButton, .scramble, #scramble, .setting, select, input, #timerBox, body, #settings, #softkeys, #session, td, th, #sessions, #divider, .line');

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
let statusChange = document.querySelector('#statusChange');
let startKey = document.querySelector('#startKey');

let lastFocused;

let autoFontSize = true;
let scrambleFontSize = "17px";

var moves = new Array();
var limit = 20;
var keys = "";

let allSelectElems = document.querySelectorAll('select');