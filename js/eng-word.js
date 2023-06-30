let pathname;
let langData;
let currentPage = 1;
let randomContent;
let a;
let qq = "";
let aPos = 0;
let aInput = "";

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
    a = "";
    qq = "";
    aPos = 0;
    aInput = "";
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function onClickMatch(text, pos) {
    if(a.charAt(aPos) == text) {
        aInput += text;
        $("#card_text").text(aInput);
        aPos += 1;
        
        if(a == aInput) {
            playSound(successSound);
            $(pos).removeClass("text-bg-warning");
            $(pos).removeClass("text-white");
            $(pos).removeClass("text-warning");
            $(pos).addClass("text-bg-success");
            
            if(qq != undefined) {
                $("#card_title").text($("#card_title").text() + " "+ qq);
            }

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
    let q = "";
    
    randomContent = getRandomContent(class1, class2);
    //console.log("random:", randomContent);
    
    q = randomContent['q'];
    qq = randomContent['qq'];
    a = randomContent['a'];
    
    $("#card_header").text(class2);
    $("#card_title").text(q);
    $("#card_text").text("");
    
    var aArr = Array.from(a);
    shuffle(aArr);
        
    //console.log("random:", randomContent);
    //console.log("a:", a);
    
    var appendItem = ``;
    $("#matchGame").text(appendItem);
    
    appendItem += `<div class="row">`;
    
    for(var i=0; i<aArr.length; i++) {
        appendItem += `<div class="col-3 p-1 mt-2">
                                  <span class="badge text-nowrap rounded-pill text-bg-warning text-white fs-5" style="width: 5rem; cursor:pointer;" onclick="onClickMatch('${aArr[i]}', '#mat${i}');" id="mat${i}">${aArr[i]}</span>
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