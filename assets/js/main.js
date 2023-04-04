(function () {
    'use strict';
    var img = document.createElement('img');
    img.src = 'assets/img/src_hq.png';
    var canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    document.getElementById('container').appendChild(canvas);
    
    var str = "";
    function render() {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        var now = new Date();
        var hourStrs = ['零', '一', '两', '三', '四', '五', 
            '六', '七', '八', '九', '十', '十一',
            '十二', '十三', '十四', '十五', '十六', '十七',
            '十八', '十九', '二十', '二十一', '二十二', '二十三'];
        str = hourStrs[now.getHours()] + '点';
        if (now.getMinutes() > 0) {
            var upperStrs = ['零', '十', '二十', '三十', '四十', '五十'];
            var lowerStrs = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            str += upperStrs[Math.floor(now.getMinutes() / 10)] + lowerStrs[now.getMinutes() % 10] + '分';
        }
        str += '了！';

        // 字数范围：4 - 9
        // 268 是指从第一个字的开始到最后一个字结束的位置
        //       啊 啊 啊 啊 啊 啊
        //     ->      268       <-
        var baseLength = str.length - 4;
        var startX = 890 - (96 - (44 * (baseLength / 5))) / 2;
        var startY = 32;
        var addY = (536 - (10 - baseLength) * 4) / (str.length - 1);
        ctx.font = 96 - (44 * (baseLength / 5)) + 'px SimHei, STHeiti';
        ctx.fillStyle = "#000";
        ctx.textBaseline = 'top';
        for (var i = 0; i < str.length; i++) {
            ctx.fillText(str[i], startX, startY + addY * i);
        }
        setTimeout(render, 60000);
    }
    document.getElementById('dl-btn').addEventListener('click', function() {
        download(canvas, 'serval_' + str + '.png');
    });

    // 先绘制 placeholder
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px SimHei, STHeiti';
    ctx.fillStyle = "#000";
    ctx.fillText("Loading...", 50, 50);
    
    img.onload = render;

    function changeBG() {
        var bg = 'rgb(' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ')';
        document.getElementById('github-bg').style.color = bg;
        document.body.style.backgroundColor = bg;
        setTimeout(changeBG, 10000);
    }
    changeBG();
    
    // http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
    function download(canvas, filename) {
        var lnk = document.createElement('a'), e;
        lnk.download = filename;
        lnk.href = canvas.toDataURL("image/png;base64");
        lnk.click();
    }
})();
