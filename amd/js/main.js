'use strict';
require.config({
    //baseUrl: "./js",
    paths: {
        //"require":"lib/require/require",
        "domReady":"lib/require/domReady",
        "jquery": [
                "lib/jquery/jquery-1.8.2.min",
                "lib/jquery/jquery-2.1.3.min"
            ]
            //上述代码先尝试加载jquery-1.8.2.min版本，如果出错，则退回到本地的jquery-2.1.3.min。
    },
    shim: {
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        }
    },
    waitSeconds: 10 //默认情况下为7秒
});
//'domReady!',doc
require(["require", "module/manager",'jquery','domReady!'], function(require, manager,$,doc) {
    // var cssUrl = require.toUrl("css/re.css");
    // console.log(cssUrl);
    manager.addNewStudent("Jack", "male");
    manager.addNewStudent("Rose", "female");
    $('#vo1s').val(manager.getMyClassSize());
    console.log(manager.getMyClassSize()); // 输出 2 
});
requirejs.onError = function(err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};
