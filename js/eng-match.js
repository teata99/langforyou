let pathname;
let langData;
let currentPage = 1;
let match = [];
let matchContent = [];
let selectedText = "";
let selectedPos = "";
let selectedPosArray = [];

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

function appendNav() {
    let navCnt = 0;
    
    for(class1 in langData) {
        var appendItem = `<li class="mb-1"><button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#collapse${navCnt}" aria-expanded="false"> <span class="ms-1">${class1}</span> </button>
        <div class="collapse" id="collapse${navCnt}">
                                <ol class="btn-toggle-nav list-unstyl fw-normal pb-1 small" id="subClass${navCnt}">
                                </ol>
        </li>`;

        $("#navClass").append(appendItem);

        for(class2 in langData[class1]) {
            var appendItem = `<li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded" onclick="onClickNav('${class1}', '${class2}', 1);">${class2}</a></li>`;
            
            $("#subClass"+navCnt).append(appendItem);
        }

        navCnt += 1;
    }
}

function collapseNav(params_class1, params_class2, currentPage) {
    let navCnt = 0;
    
    if(currentPage==null || currentPage==undefined || currentPage=='') {
        currentPage = 1;
    }
    
    for(class1 in langData) {
        for(class2 in langData[class1]) {

            if(params_class1 == class1 && params_class2 == class2) {
                
                $("#collapse"+navCnt).collapse('show');
                onClickNav(params_class1, params_class2, currentPage);
            }
        }

        navCnt += 1;
    }
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
        
        if(selectedPosArray.length==18) {
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
    
    for(var i=0; i<9; i++) {
        var randomContent = getRandomContent(class1, class2);
        match.push(randomContent);
        matchContent.push(randomContent['q']);
        matchContent.push(randomContent['a']);
    }
    
    shuffle(matchContent);

    
    var appendItem = ``;
    $("#matchGame").text(appendItem);
    
    for(var i=0; i<6; i++) {
        
        appendItem += `<div class="row">`;
        
        for(var j=0; j<3; j++) {
            //console.log(matchContent[i*3+j]);
            appendItem += `<div class="col-md-4 col-sm-6 p-2 mt-2">
                                  <span class="badge text-nowrap rounded-pill text-bg-warning text-warning fs-4" style="width: 10rem;" onclick="onClickMatch('${matchContent[i*3+j]}', '#mat${i*3+j}');" id="mat${i*3+j}">${matchContent[i*3+j]}</span>
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



function setBread(class1, class2, pageNo) {
    $("#breadClass1").text(class1);
    
    var appendItem = `<a href="${this.pathname}?class1=${class1}&class2=${class2}&currentPage=${pageNo}">${class2}</a>`;
    $("#breadClass2").text('');
    $("#breadClass2").append(appendItem);
}

function onClickNav(class1, class2, currentPage) {
    this.currentPage = currentPage;
    initMatch();
    setBread(class1, class2, currentPage);
    setMatchContent(class1, class2, currentPage);
    
}