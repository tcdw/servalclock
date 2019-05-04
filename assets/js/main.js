(function () {
    'use strict';
    var img = document.createElement('img');
    img.src = 'assets/img/file_2594336.png';
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        var now = new Date();
        var hourStrs = ['零', '一', '两', '三', '四', '五', '六',
            '七', '八', '九', '十', '十一', '十二',
            '十三', '十四', '十五', '十六', '十七', '十八',
            '十九', '二十', '二十一', '二十二', '二十三'];
        var str = hourStrs[now.getHours()] + '点';
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
        var startX = 445 - (48 - (22 * (baseLength / 5))) / 2;
        var startY = 16;
        var addY = (268 - (5 - baseLength) * 4) / (str.length - 1);
        ctx.font = 48 - (22 * (baseLength / 5)) + 'px SimHei, STHeiti';
        ctx.fillStyle = "#000";
        ctx.textBaseline = 'top';
        for (var i = 0; i < str.length; i++) {
            ctx.fillText(str[i], startX, startY + addY * i);
        }

        document.getElementById('container').appendChild(canvas);
        document.getElementById('dl-btn').addEventListener('click', function() {
            download(canvas, 'serval_' + str + '.png');
        });
    }

    var bg = 'rgb(' +
        Math.floor(Math.random() * 256) + ', ' +
        Math.floor(Math.random() * 256) + ', ' +
        Math.floor(Math.random() * 256) + ')';
    document.getElementById('github-bg').style.color = bg;
    document.body.style.backgroundColor = bg;
    
    // http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
    function download(canvas, filename) {
        var lnk = document.createElement('a'), e;
        lnk.download = filename;
        lnk.href = canvas.toDataURL("image/png;base64");
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);
            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }
})();
