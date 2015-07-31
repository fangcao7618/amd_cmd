// require(['AppName', function() {
//     var span = document.createElement("span"),
//         text = "";
//     for (var i = 0, len = arguments.length; i < len; i++) {
//         text += "第" + i + "个参数:" + arguments[i].toString();
//         text += "<br/>"
//     }

//     var song = new Song("春天的故事");
//     text += "song title:" + song.title;
//     text += "<br/>";
//     text += "album first song:" + Album.songs[0].title;
//     span.innerHTML = text;
//     var resultShowPanel = document.getElementById("resultShowPanel");
//     resultShowPanel.innerHTML = "";
//     resultShowPanel.appendChild(span);
// }]);
;
(function() {
    define("AppName.Song", function() {
        var Song = function(title) {
            this.title = title;
        }
    })
    define("AppName.Album", function() {
        var Album = {};
        Album.title = "当耐特专辑";
        Album.songs = [new Song("当耐特进行曲"), new Song("当耐特荡起双桨")];
    })
    require(["AppName"], function() {
        var span = document.createElement("span"),
            text = "";
        for (var i = 0, len = arguments.length; i < len; i++) {
            text += "第" + i + "个参数:" + arguments[i].toString();
            text += "<br/>"
        }

        var song = new Song("春天的故事");
        text += "song title:" + song.title;
        text += "<br/>";
        text += "album first song:" + Album.songs[0].title;
        span.innerHTML = text;
        var resultShowPanel = document.getElementById("resultShowPanel");
        resultShowPanel.innerHTML = "";
        resultShowPanel.appendChild(span);
    })

})();