let langData;
let class1No = 0;
let class2No = 0;
let currentPage = 1;
let totalCount = 0;
let pageTotal = 0;
let pageGroup = 0;
let pageCount = 10;
let pageLimit = 1;

function initData(data) {
    langData = data;
}

function initForm() {

    $("#kor").val("");
    $("#eng").val("");
    $("#answer").val("");
    $("#correct").text("0%");
    $("#eng").attr("type", "password");
    $("#pagination").text("");    
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

function countPage(class1, class2, currentPage) {
    totalCount = 0;
    
    for(class1 in langData) {
        for(class2 in langData[class1]) {
            totalCount += 1;        
        }
    }
    
    pageTotal = Math.ceil(totalCount / pageLimit);
    pageGroup = Math.ceil(currentPage / pageCount);
    
    let lastNumber = pageGroup * pageCount;
    
    if(lastNumber > pageTotal) {
        lastNumber = pageTotal;
    }
    
    let firstNumber = lastNumber - (pageCount - 1);
    
    let next = lastNumber + 1;
    let prev = firstNumber - 1;
    
    for(let i = firstNumber; i <= lastNumber; i++) {
        appendPagination('', '', i, currentPage);
    }
}


function appendPagination(class1, class2, pageNo, currentPage) {
    let active = "";
    
    if(pageNo == currentPage) {
        active = "active";
    }
    
    var appendItem = `<li class="page-item ${active}"><a href="#" class="page-link" onclick="onClickNav('${class1}', '${class2}', ${pageNo});">${pageNo}</a></li>`;
    
    $("#pagination").append(appendItem);
}

function onClickNav(class1, class2, currentPage) {
    initForm();
    $("#answer").focus();
    countPage(class1, class2, currentPage);
    
}


















