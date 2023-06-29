function appendNav(langData) {
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

function collapseNav(langData, params_class1, params_class2, currentPage) {
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

function setBread(pathname, class1, class2, pageNo) {
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
            
    $("#breadClass1").text(class1);
    var appendItem;
    
    if((class1 == urlParams.get('class1')) && (class2 == urlParams.get('class2'))) {
        appendItem = `<a href="#" onClick="onClickNav('${class1}', '${class2}', ${pageNo});">${class2}</a>`; 
    } else {
        appendItem = `<a href="${pathname}?class1=${class1}&class2=${class2}&currentPage=${pageNo}">${class2}</a>`;
    }
    
    $("#breadClass2").text('');
    $("#breadClass2").append(appendItem);
}

function setBreadNav(class1, class2, pageNo) {
    $("#breadClass1").text(class1);
    
    var appendItem = `<a onClick="onClickNav('${class1}', '${class2}', ${pageNo});">${class2}</a>`; 
    $("#breadClass2").text('');
    $("#breadClass2").append(appendItem);    
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
