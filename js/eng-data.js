let langData;
let class1No = 0;
let class2No = 0;
let currentPage = 0;
let totalCount = 0;
let pageCount = 10;
let pageLimit = 1;

function initData(data) {
    langData = data;
}

function countPage() {
    for(class1 in langData) {
        for(class2 in langData[class1]) {
            console.log(class1, class2);
            
            
        }
    }
}