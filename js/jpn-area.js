let pathname;
let langData;
let currentPage = 1;
let randomContent;
let c8;
let c8Pos = 0;
let c8Input = "";

const alphabet = Array.from({length: 26}, (v, i) => String.fromCharCode(i+65));
const clickSound = new Audio('./sounds/button-41.mp3');
const hitSound = new Audio('./sounds/button-43.mp3');
const successSound = new Audio('./sounds/magic-chime-03.mp3');
const failSound = new Audio('./sounds/button-42.mp3');

function initData(pathname, data) {
    this.pathname = pathname;
    langData = data;
}

function initMatch() {
    c8 = "";
    c8Pos = 0;
    c8Input = "";
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function onClickMatch(text, pos) {
    if(c8.charAt(c8Pos) == text) {
        c8Input += text;
        $("#card_text").text(c8Input);
        c8Pos += 1;
        
        if(c8 == c8Input) {
            playSound(successSound);
            $(pos).removeClass("text-bg-warning");
            $(pos).removeClass("text-white");
            $(pos).removeClass("text-warning");
            $(pos).addClass("text-bg-success");             

        } else {
            playSound(hitSound);
            $(pos).removeClass("text-bg-warning");
            $(pos).removeClass("text-white");
            $(pos).removeClass("text-warning");
            $(pos).addClass("text-bg-success"); 
        }
        
    } else {
        playSound(failSound);
    }

}

function setMatchContent(class1, class2, pageNo) {
    
    randomContent = getRandomContent(class1, class2);
    $("#card_header").text(class2);
    $("#card_title").text(randomContent['c2']);
    $("#card_text").text("");
    
    if(randomContent['c2'] == "false") {
        c8 = randomContent['c7'];
    } else {
        c8 = randomContent['c8']
    }
    
    var c8Arr = Array.from(c8);
    shuffle(c8Arr);
        
    //console.log("random:", randomContent);
    //console.log("c8:", c8);
    
    var appendItem = ``;
    $("#matchGame").text(appendItem);
    
    appendItem += `<div class="row">`;
    
    for(var i=0; i<c8Arr.length; i++) {
        appendItem += `<div class="col-3 p-1 mt-2">
                                  <span class="badge text-nowrap rounded-pill text-bg-warning text-white fs-5" style="width: 5rem;" onclick="onClickMatch('${c8Arr[i]}', '#mat${i}');" id="mat${i}">${c8Arr[i]}</span>
                              </div>`;
    }
    
    appendItem += `</div>`;
    
    $("#matchGame").append(appendItem);
    
    appendItem = ``;
    
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