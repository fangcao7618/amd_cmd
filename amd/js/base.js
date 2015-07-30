define(function() {
    var DataFun = {
        imagesUrl: document.getElementById('imagePath').value + '/',
        orgId: document.getElementById('orgId').value,
        cardNo: document.getElementById('cardNo').value,
        _gwPath: document.getElementById('gwPath').value,
        /**
         * [priceFormat //格式化]
         * @param  {[type]} s [金额]
         * @param  {[type]} n [小数点]
         * @return {[type]}   [description]
         */
        priceFormat: function(s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            t = "";
            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },
        /**
         * [priceLabelFormat 给小数位添加标签]
         * @param  {[type]} s [description]
         * @param  {[type]} n [description]
         * @return {[type]}   [description]
         */
        priceLabelFormat: function(s, n) {
            n = n > 0 && n <= 20 ? n : 2;
            var fu='';
            if(parseFloat(s)<0){
                fu='-';
            }
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "").replace('-','')).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
                
            t = "";

            for (i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }

            return fu+t.split("").reverse().join("") + '<sub>.' + r + '</sub>';
        },
        /**
         * [rmoney 格式化后的金额字符串还原]
         * @param  {[type]} s [description]
         * @return {[type]}   [description]
         */
        rmoney: function(s) {
            return parseFloat(s.replace(/[^\d\.-]/g, ""));
        },
        $D: function(id) {
            document.getElementById(id);
        },
        hasDisPlay: function(id) {
            var flag = false;
            if ($(id).is(':hidden')) {
                flag = true;
            }
            return flag;
        },
        hasElement: function(id) {
            var flag = false;
            if ($('#' + id).length > 0) {
                flag = true;
            }
            return flag;
        },
        ajaxFun: function(dataUrl, callBackFun, messg, beforeSendBackFun, completeBackFun) {
            $.ajax({
                //url: dataUrl,
                url: dataUrl + '&sessionId=4c519543344b879507fc77c64a4adfec59a802b7&did=4c519543344b879507fc77c64a4adfec59a802b7',
                type: 'post',
                async:true,
                cache: true,
                dataType: 'json',
                timeout: 5000,
                beforeSend: function(XMLHttpRequest, textStatus) {
                    beforeSendBackFun();
                },
                success: function(data) {
                    callBackFun(data);
                },
                error: function() {
                    console.log('系统繁忙，请稍后再试！' + messg);
                },
                complete: function(XMLHttpRequest, textStatus) {
                    completeBackFun();
                }
            });
        },
        consoleFun: function(logType, obj) {
            switch (logType) {
                case 'log':
                    console.log(obj);
                    break;
                case 'dir':
                    console.dir(obj);
                    break;
            }
        },
        getValue: function(obj, key, defaultValue, labelValue) {
            var result = obj[key];
            //console.log(result);
            if (undefined === result || null === result) {
                result = defaultValue;
            }
            if (labelValue != '') {
                retult = labelValue;
            }
            return result;
        }
    };
    return DataFun;
});
