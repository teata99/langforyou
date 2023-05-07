let pathname;
let langData;
let gramData;
let class1No = 0;
let class2No = 0;
let classPage = 1;
let currentPage = 1;
let totalCount = 0;
let pageTotal = 0;
let pageGroup = 0;
let pagePer = 1;
let pageCount = 8;

function initData(pathname, data) {
    this.pathname = pathname;
    langData = data;
}

function initGram(data) {
    gramData = data;
}

function initForm() {

    $("#q").val("");
    $("#a").val("");
    $("#answer").val("");
    $("#correct").text("0%");
    $("#progress").attr("style", "width: 0%;");
    $("#a").attr("type", "password");
    $("#pagination").text("");    
}

function countPage(params_class1, params_class2, currentPage) {
    totalCount = 0;
    
    for(class1 in langData) {
        for(class2 in langData[class1]) {
            for(class3 in langData[class1][class2]) {
            
                if(class1 == params_class1 && class2 == params_class2) {
                    totalCount += 1;
                }
            }
        }
    }
        
    pageTotal = Math.ceil(totalCount / pagePer);
    pageGroup = Math.ceil(currentPage / pageCount);
    
    let lastNumber = pageGroup * pageCount;
    
    if(lastNumber > pageTotal) {
        lastNumber = pageTotal;
    }
    
    let firstNumber = lastNumber - (pageCount - 1);
    
    if(firstNumber < 1) {
        firstNumber = 1;
    }
    
    let next = lastNumber + 1;
    let prev = firstNumber - 1;
    
    if(pageTotal < 1) {
        firstNumber = lastNumber;
    }

    if(prev > 0) {
        appendPagination(params_class1, params_class2, prev, currentPage, '&laquo;');
    }
    
    for(let i = firstNumber; i <= lastNumber; i++) {
        appendPagination(params_class1, params_class2, i, currentPage, '');
    }

    if(next <= pageTotal) {
        appendPagination(params_class1, params_class2, next, currentPage, '&raquo;');
    }
}


function appendPagination(class1, class2, pageNo, currentPage, mark) {
    let active = "";
    let text = "";
    
    if(pageNo == currentPage) {
        active = "active";
    }
    
    if(mark!='') {
        text = mark;
    } else {
        text = pageNo;
    }
    
    var appendItem = `<li class="page-item ${active}"><a href="#" class="page-link" onclick="onClickNav('${class1}', '${class2}', ${pageNo});">${text}</a></li>`;
    
    $("#pagination").append(appendItem);
}

function appendPaginationAnchor(class1, class2, pageNo, mark) {
    var appendItem = `<li class="page-item">
                       <a href="${this.pathname}?class1=${class1}&class2=${class2}&currentPage=${pageNo}" class="page-link">
                           <span aria-hidden="true">${mark}</span>
                       </a>
                   </li>`;
    $("#pagination").append(appendItem); 
}

function setContent(params_class1, params_class2, currentPage) {
    let pageCnt = 1;
    let classCnt = 1;

    for(class1 in langData) {
        for(class2 in langData[class1]) {
            for(class3 in langData[class1][class2]) {
                
                if(class1 == params_class1 && class2 == params_class2 && pageCnt == currentPage) {
                    $("#q").val(langData[class1][class2][class3]['q']);
                    $("#a").val(langData[class1][class2][class3]['a']);
                    classPage = classCnt; 
                }
                
                if(class1 == params_class1 && class2 == params_class2) {
                    pageCnt += 1;
                }
            }
            
            classCnt += 1;
        }
    }
}

function setGramContent(param_class1, param_class2) {
    
    for(class1 in gramData) {
        for(class2 in gramData[class1]) {
        
            if(class1 == param_class1 && class2 == param_class2) {
                if(gramData[class1][class2] != null && gramData[class1][class2] != undefined && gramData[class1][class2] != "") {
                    $("#gram").text(gramData[class1][class2]);
                } else {
                    $("#gram").text("Welcome!");                
                }
            }    
        }
    }

}

function answerKeyEvent() {
    let correctCnt = 0;
    const a = $("#a").val();
    const answer = $("#answer").val();
    
    const aArray = [...a];
    const answerArray = [...answer];
    
    aArray.forEach(function(item, index) {
        //console.log(item, index);
        if(item == answerArray[index]) {
            correctCnt += 1;
        }
    });
    
    let per = Math.round((correctCnt / aArray.length * 100) * 1) / 1;
    $("#progress").attr("style", "width:"+per+"%");
    $("#correct").text(per+"%");
}

function correctToggle() {
    if($("#a").attr("type") == "password") {
        $("#a").attr("type", "input");
    } else {
        $("#a").attr("type", "password");
    }
}

function correctOn() {
    $("#a").attr("type", "input");
}

function correctOff() {
    $("#a").attr("type", "password");
}

function moveClassPage(direction) {
    let classCnt = 1;
    let changePage = classPage + direction;
    
    for(class1 in langData) {
        for(class2 in langData[class1]) {

            if(classCnt == changePage) {
                onClickNav(class1, class2, 1);
                return;
            }
            
            classCnt += 1;
        }
    }
}

function movePage(direction) {
    let changePage = Number(this.currentPage) + direction;

    if(changePage > 0 && changePage <= totalCount) {
        onClickNav($("#breadClass1").text(), $("#breadClass2").text(), changePage);
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function randomNav(randomData) {
    let classCnt = 0;
    
    for(class1 in randomData) {
        for(class2 in randomData[class1]) {
            classCnt += 1;
        }
    }
    
    let classRan = Math.floor(Math.random() * classCnt);
    
    classCnt = 0;
    
    for(class1 in randomData) {
        for(class2 in randomData[class1]) {
            if(classCnt == classRan) {
                onClickNav(class1, class2, 1);
                return;
            }
            
            classCnt += 1;
        }
    }

}


function onClickNav(class1, class2, currentPage) {
    this.currentPage = currentPage;
    initForm();
    $("#answer").focus();
    
    setBread(this.pathname, class1, class2, currentPage);
    setContent(class1, class2, currentPage);
    countPage(class1, class2, currentPage);
    
    if(gramData != null && gramData != undefined) {
        setGramContent(class1, class2);
    }
}


















