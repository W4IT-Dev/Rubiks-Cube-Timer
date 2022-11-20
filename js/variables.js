let spacedown = false;
let spaceddown = false;
let ready = false;
let time;
let timing = false;
let startKeyName = '5';
let timermargintop = '40px';
let timermargintoppercentage = '50%';

let canChange = false;

let allTimes = [];

let allelem = document.querySelectorAll('.setting, select, input, #timerBox, body, #settings, #softkeys, #session, td, th, #sessions, #divider, .line');

let settingsOpened = false;

let scrambleOnDom = document.getElementById('scramble');
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

var moves = new Array();
var limit = 20;
var keys = "";

let allSelectElems = document.querySelectorAll('select');