let pathname;
let langData;
let currentPage = 1;
let match = [];
let matchContent = [];
let selectedText = "";
let selectedPos = "";
let selectedPosArray = [];
let rowCnt = 10;
let colCnt = 2;

const clickSound = new Audio('./sounds/button-41.mp3');
const hitSound = new Audio('./sounds/button-43.mp3');
const successSound = new Audio('./sounds/magic-chime-03.mp3');
const failSound = new Audio('./sounds/button-42.mp3');

function initData(pathname, data) {
    this.pathname = pathname;
    langData = data;
}

function initMatch() {
    match = [];
    matchContent = [];
    selectedText = "";
    selectedPos = "";
    selectedPosArray = [];    
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function searchMatchText(text) {
    for(m in match) {
        if(match[m]['q'] == text) {
            return match[m]['a'];
        } 
        
        if(match[m]['a'] == text) {
            return match[m]['q'];
        }
    }
}

function onClickMatch(text, pos) {
    //console.log(text, pos);
    if(selectedPosArray.indexOf(pos) !== -1) {
        playSound(failSound);
        return;
    }
    
    var searchText = searchMatchText(text);
    //console.log(searchText);
    
    if(selectedText == searchText) {
        
        
        $(selectedPos).removeClass("text-bg-warning");
        $(selectedPos).removeClass("text-white");
        $(selectedPos).removeClass("text-warning");
        $(selectedPos).addClass("text-bg-success");
        $(pos).removeClass("text-bg-warning");
        $(pos).removeClass("text-white");
        $(pos).removeClass("text-warning");
        $(pos).addClass("text-bg-success");
        
        selectedPosArray.push(selectedPos);
        selectedPosArray.push(pos);
        selectedText = "";
        selectedPos = "";
        
        if(selectedPosArray.length==rowCnt*colCnt) {
            playSound(successSound);
        } else {
            playSound(hitSound);
        }
        
    } else {
        playSound(clickSound);
        $(selectedPos).removeClass("text-white");
        $(selectedPos).addClass("text-warning");
        
        selectedText = text;
        selectedPos = pos;
        
        $(pos).removeClass("text-warning");
        $(pos).addClass("text-white");
    }
    
    
    
}

function setMatchContent(class1, class2, pageNo) {
    let matchCnt = 0;
    
    for(var i=0; i<(rowCnt*colCnt/2); i++) {
        var randomContent = getRandomContent(class1, class2);
        match.push(randomContent);
        matchContent.push(randomContent['q']);
        matchContent.push(randomContent['a']);
    }
    
    shuffle(matchContent);
    
    var appendItem = ``;
    $("#matchGame").text(appendItem);
    
    for(var i=0; i<rowCnt; i++) {
        
        appendItem += `<div class="row">`;
        
        for(var j=0; j<colCnt; j++) {
            //console.log(matchContent[i*3+j]);
            appendItem += `<div class="col-6 p-1 mt-2">
                                  <span class="badge text-nowrap rounded-pill text-bg-warning text-warning fs-5" style="width: 11rem;" onclick="onClickMatch('${matchContent[i*colCnt+j]}', '#mat${i*colCnt+j}');" id="mat${i*colCnt+j}">${matchContent[i*colCnt+j]}</span>
                              </div>`;
        }
        
        appendItem += `</div>`;
        
        $("#matchGame").append(appendItem);
        appendItem = ``;
    }
    
}

function getRandomContent(params_class1, params_class2) {
    let classCnt = 0;
    
    for(class1 in langData) {
        for(class2 in langData[class1]) {
            for(class3 in langData[class1][class2]) {
                if(params_class1 == class1 && params_class2 == class2) {
                    classCnt += 1;
                }
            }
        }
    }
    
    let classRan = Math.floor(Math.random() * classCnt);
    
    classCnt = 0;
    
    for(class1 in langData) {
        for(class2 in langData[class1]) {
            for(class3 in langData[class1][class2]) {
                if(params_class1 == class1 && params_class2 == class2) {
                    if(classCnt == classRan) {
                        
                        return langData[class1][class2][class3];
                    }

                    classCnt += 1;
                }
            }
        }
    }    
    
}


function onClickNav(class1, class2, currentPage) {
    this.currentPage = currentPage;
    initMatch();
    setBread(this.pathname, class1, class2, currentPage);
    setMatchContent(class1, class2, currentPage);
    
}