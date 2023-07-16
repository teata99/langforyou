jQuery.syncScript = function(url, options) {
    options = $.extend( options || {}, {
        dataType: "script",
        cache: false,
        async: false,
        url: url
    });
    return jQuery.ajax( options );
}

function ifChannels(channelId) {
    let url;
    let jsonData;

    $.syncScript("./js/youtube-if.js", {async: false}).done(function() {
        url = "https://www.googleapis.com/youtube/v3/channels/?part=snippet,contentDetails,statistics&id=" + channelId;
        jsonData = youTubeIf(url);

    }).fail(function(jqxhr, settings, exception) {

    });

    return jsonData;
}

function ifPlaylists(channelId) {
    let url;
    let jsonData;

    $.syncScript("./js/youtube-if.js").done(function() {
        url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&maxResults=50&id=" + channelId;
        jsonData = youTubeIf(url);

    }).fail(function(jqxhr, settings, exception) {

    });

    return jsonData;
}

function ifSearch(channelId) {
    let url;
    let jsonData;

    $.syncScript("./js/youtube-if.js").done(function() {
        url = "https://www.googleapis.com/youtube/v3/search?part=snippet,contentDetails&type=video&maxResults=5&order=date&channelId=" + channelId;
        jsonData = youTubeIf(url);

    }).fail(function(jqxhr, settings, exception) {

    });

    return jsonData;
}

function ucToUu(id) {
    if(id.slice(0,2)=='UC') {
         return "UU" + id.substring(2);       
    }
    return id;
}

let pathname;
let langData;
let currentPage = 1;

function initData(pathname, data) {
    this.pathname = pathname;
    langData = data;
}

function onClickNav(class1, class2, currentPage) {
    this.currentPage = currentPage;
    setBread(this.pathname, class1, class2, currentPage);
    
    let content = langData[class1][class2];
    let channels = ifChannels(content.externalId);
    let playlists = ifPlaylists(ucToUu(content.externalId));

    $("#ytUrl").attr("href", "https://www.youtube.com/" + content.channel + "/featured");
    $("#ytChannel").text(content.channel);
    $("#ytTitle").text(class2);
        
    for(item in channels.items) {
        $("#ytChannel").text(channels.items[item].snippet.customUrl);
        $("#ytTitle").text(channels.items[item].snippet.title);
        $("#ytDescription").text(channels.items[item].snippet.description);
        $("#ytThumbnails").attr("src", channels.items[item].snippet.thumbnails.default.url);
        //thumbnails default url
        
        let subscriberCount = Number(channels.items[item].statistics.subscriberCount); 
        let videoCount = Number(channels.items[item].statistics.videoCount);
        
        $("#ytStatistics").text("구독자 " + subscriberCount.toLocaleString() + "명 동영상 " + videoCount.toLocaleString() + "개" );
    }
    
    for(item in playlists.items) {
        let thumbnails = playlists.items[item].snippet.thumbnails.default.url;
        let array = thumbnails.split("/");
        
        if(array.length > 4) {
            $("#ytVideo").attr("src", "https://www.youtube.com/embed/" + array[4]);
        }
    }

    //채널ID//externalId    
}









            
            