require.config({
    paths: {
        jquery: [
            'jquery/jquery-1.8.2.min'
        ]
    },
    waitSeconds: 7
});
require(['jquery','newIndex'], function($,newIndex) {
    newIndex.init();
});