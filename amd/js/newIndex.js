define(['jquery', 'base', 'marquee', 'esl'], function($, DataFun,Marquee) {
    // 路径配置
    require.config({
        packages: [{
            name: 'zrender',
            location: 'zrender-2.0.7/src', // zrender与echarts在同一级目录  
            main: 'zrender'
        }, {
            name: 'echarts',
            location: 'echarts-2.2.0/src',
            main: 'echarts'
        }]
    });
    var hTu = {
        bitEchart: null,
        DrawObj: function(id) {
            return DataFun.hasElement(id) ? hTu.bitEchart.init(document.getElementById(id)) : false;
        },
        DrawMethod: function(obj, callback) {
            if (!obj) {
                return;
            }
            obj.showLoading({
                text: "图表数据正在努力加载..."
            });
            require(['echarts/theme/fc'], function(tarTheme) {
                obj.setTheme(tarTheme);
                obj.hideLoading();
            });

            obj.setOption(callback);
        },
        overallLayout: function(obj) {
            obj[0].addClass('hide');
            obj[1].removeClass('hide');
            obj[5].eq(obj[2]).addClass('hide');
            obj[5].eq(obj[3]).removeClass('hide');

            newIndexDomBind.modFlowInfoBind(obj[4], 'oneInit');
        },
        DrawCharts: function(ec) {
            hTu.bitEchart = ec;
            ajaxSourceData.summaryDataAjax();

            // window.onresize = function() {
            //     _savsGraph.resize();
            //     _creditGraph.resize();
            // };
        },
        /**
         * [savsGraphSetting 动态设置储蓄卡数据]
         * @return {[type]} [description]
         */
        savsGraphSetting: function(debitIncomePayData) {
            var obj = hTu.savsGraph();
            $('.savsGraph img').addClass('hide');
            //flag:true 代表没有数据 false 代表有数据
            if (debitIncomePayData.flag === 'true') {
                obj.legend.show = true;
                obj.selectedMode = false;
                obj.tooltip.show = false;
                obj.yAxis[0].type = 'category';
                obj.yAxis[0].boundaryGap = false;
                obj.yAxis[0].data=['0', '1,000', '5,000', '10,000', '15,000', '30,000'];
                $('.savsGraph img').removeClass('hide');
            }
            obj.xAxis[0].data = debitIncomePayData.monthData;
            obj.series[0].data = debitIncomePayData.incomeData;
            obj.series[1].data = debitIncomePayData.expenditureData;
            obj.series[2].data = debitIncomePayData.balance;
            return obj;
        },
        creditGraphSetting: function(creditBillingData) {
            var obj = hTu.creditGraph();
            for (var i = 0; i < creditBillingData.seriesData.length; i++) {
                obj.legend.data.push(creditBillingData.seriesData[i].name);
            }
            if (creditBillingData.seriesData.length > 0) {
                if(creditBillingData.seriesData.length===1){
                    creditBillingData.seriesData.push({
                        value: 0,
                        name: ''
                    });
                }
                obj.series[0].data = creditBillingData.seriesData;
            } else {
                obj.legend.show = true;
                obj.selectedMode = false;
                obj.tooltip.show = false;
                obj.title.textStyle.color = '#9b9b9b';
                obj.series[0].itemStyle.normal.color = '#d8d8d8';

                obj.series[0].data.push({
                    value: 500,
                    tipValue: 500,
                    name: '无值'
                }, {
                    value: 0,
                    tipValue: 0,
                    name: '无值'
                });
            }
            return obj;
        },
        savsGraph: function() {
            return option = {
                legend: {
                    selectedMode: false,
                    orient: 'horizontal',
                    x: 'right',
                    y: 'top',
                    itemGap: 20,
                    itemWidth: 12,
                    itemHeight: 12,
                    padding: [10, 10, 10, 0],
                    textStyle: {
                        fontSize: 12,
                        color: '#999',
                        fontWeight: 'normal',
                        fontFamily: '方正兰亭黑简体'
                    },
                    selected: {
                        '降水量': false
                    },
                    data: ['收入', '支出', {
                        name: '结余'
                    }]
                },
                tooltip: {
                    trigger: 'axis',
                    borderRadius: 2,
                    padding: [15, 10, 15, 10],
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    textStyle: {
                        color: '#fff',
                        decoration: 'none',
                        fontFamily: '方正兰亭黑简体',
                        fontSize: 12,
                        fontWeight: 'normal'
                    },
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,0,0,0.02)',
                            width: 'auto',
                            type: 'default'
                        }
                    },
                    formatter: '{b}收支情况<br/><span style="float:left;margin-right:20px;">{a1}</span><span style="float:right;">{c1}</span><br/><span style="float:left;margin-right:20px;">{a}</span><span style="float:right;">{c}</span><br/><span style="float:left;margin-right:20px;">{a2}</span><span style="float:right;">{c2}</span>'
                },
                calculable: false,
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: '#d8d8d8'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#f8f8f8'],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#546e7a',
                            fontFamily: 'Helvetica Neue,方正兰亭黑简体',
                            fontSize: 12
                        }
                    },
                    data: []
                }],
                grid: {
                    z: 0,
                    x: 70,
                    y: 40,
                    x2: 0,
                    y2: 40,
                    borderWidth: 0,
                    borderColor: "#d8d8d8",
                    boundaryGap: true
                },
                xAxis: [{
                    type: 'category',
                    splitLine: {
                        lineStyle: {
                            color: ['#c00'],
                            width: 0,
                            type: 'solid'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: '#d8d8d8'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#9e9e9e',
                            fontFamily: 'Helvetica Neue,方正兰亭黑简体',
                            fontSize: 12
                        }
                    },
                    data: []
                }],
                series: [{
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            color: 'rgba(246,91,91,0.5)',
                            label: {
                                show: false
                            }
                        }
                    },
                    data: []
                }, {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            color: 'rgba(100,196,63,0.5)',
                            label: {
                                show: false,
                                position: 'bottom'
                            }
                        }
                    },
                    data: []
                }, {
                    name: '结余',
                    type: 'line',
                    symbol: 'emptyCircle',
                    symbolSize: 3,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,159,240,1)',
                            lineStyle: {
                                width: 2
                            },
                            label: {
                                show: false,
                                position: 'inside'
                            }
                        }
                    },
                    data: []
                }]
            };
        },
        creditGraph: function() {
            return option = {
                backgroundColor: "rgba(0,0,0,0)",
                title: {
                    text: '消费分布',
                    x: 115,
                    y: 97,
                    textStyle: {
                        fontSize: 16,
                        color: '#666',
                        fontWeight: 'normal',
                        fontFamily: '方正兰亭黑简体'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)",
                    borderRadius: 2,
                    padding: [4, 8, 4, 8],
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    textStyle: {
                        color: '#fff',
                        decoration: 'none',
                        fontFamily: 'Helvetica Neue,方正兰亭黑简体',
                        fontSize: 12,
                        fontWeight: 'normal'
                    }
                },
                legend: {
                    selectedMode: false,
                    orient: 'vertical',
                    x: 'left',
                    y: 'center',
                    itemGap: 15,
                    itemWidth: 15,
                    itemHeight: 15,
                    padding: [20, 30, 0, 280],
                    data: [],
                    textStyle: {
                        fontSize: 14,
                        color: '#666',
                        fontFamily: '方正兰亭黑简体'
                    }
                },
                series: [{
                    type: 'pie',
                    radius: ['40%', '80%'],
                    center: [146, 105],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: []
                }]
            };
        },
    };
    //使用
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/pie',
            'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
        ],
        hTu.DrawCharts
    );
    var ajaxSourceData = {
        /**
         * [objIsExists 对象是否存在]
         * @return {[type]} [description]
         */
        objIsExists: function(limit) {
            var obj = {
                title: limit.amountDesc,
                currencySymbols: limit.currency,
                price: DataFun.priceLabelFormat(limit.amount, 2)
            };
            return obj;
        },
        /**
         * [objListIsExists 对象是否存在 对象是对于LIST ]
         * @return {[type]} [description]
         */
        objListIsExists: function(notice) {
            var noticeArray = {
                recommendedNotice: [],
                repaymentNotice: []
            };
            for (var i = 0; i < notice.length; i++) {
                if (notice[i].noticeType === 'RECOMMEND') {
                    for (var j = 0; j < notice[i].displayList.length; j++)
                        noticeArray.recommendedNotice.push({
                            noticeId: notice[i].displayList[j].noticeId,
                            deposits: notice[i].displayList[j].noticeContent,
                            orgId: notice[i].displayList[j].orgId,
                            cardNo: notice[i].displayList[j].cardNo
                        });
                }
                if (notice[i].noticeType === 'CURRENT_REPAYMENT') {
                    for (var j = 0; j < notice[i].displayList.length; j++)
                        noticeArray.repaymentNotice.push({
                            noticeId: notice[i].displayList[j].noticeId,
                            deposits: notice[i].displayList[j].noticeContent,
                            orgId: notice[i].displayList[j].orgId,
                            cardNo: notice[i].displayList[j].cardNo
                        });
                }
            }
            return noticeArray;
        },
        /**
         * [summaryDataAjax 汇总数据  储蓄卡和信用卡]
         * @return {[type]} [description]
         */
        summaryDataAjax: function() {
            var operationData = '[]';
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.bdc.data.bankhome.card.get?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result,
                        summaryData = {};
                    if (DataFun.getValue(_data, 'debitCardDisplayVO', '', '') !== '') {
                        summaryData.debitCardData = {};
                        if (DataFun.getValue(_data.debitCardDisplayVO, 'currentLimit', '', '') !== '') {
                            summaryData.debitCardData.demandDeposits = ajaxSourceData.objIsExists(_data.debitCardDisplayVO.currentLimit);
                        }
                        if (DataFun.getValue(_data.debitCardDisplayVO, 'fixedLimit', '', '') !== '') {
                            summaryData.debitCardData.deposits = ajaxSourceData.objIsExists(_data.debitCardDisplayVO.fixedLimit);
                        }
                        if (DataFun.getValue(_data.debitCardDisplayVO, 'noticeLimit', '', '') !== '') {
                            summaryData.debitCardData.callDeposit = ajaxSourceData.objIsExists(_data.debitCardDisplayVO.noticeLimit);
                        }
                        if (DataFun.getValue(_data.debitCardDisplayVO, 'lumpLimit', '', '') !== '') {
                            summaryData.debitCardData.totalDeposits = ajaxSourceData.objIsExists(_data.debitCardDisplayVO.lumpLimit);
                        }
                    }

                    if (DataFun.getValue(_data, 'creditCardAllAccountsResultDTO', '', '') !== '') {
                        summaryData.creditCardData = {};
                        if (DataFun.getValue(_data.creditCardAllAccountsResultDTO, 'totalCreditLimit', '', '') !== '') {
                            summaryData.creditCardData.overdrawnAmount = ajaxSourceData.objIsExists(_data.creditCardAllAccountsResultDTO.totalCreditLimit);
                        }
                        if (DataFun.getValue(_data.creditCardAllAccountsResultDTO, 'availableCreditLimit', '', '') !== '') {
                            summaryData.creditCardData.availableAmount = ajaxSourceData.objIsExists(_data.creditCardAllAccountsResultDTO.availableCreditLimit);
                        }
                        if (DataFun.getValue(_data.creditCardAllAccountsResultDTO, 'noticeData', '', '') !== '') {
                            summaryData.creditCardData.noticeData = ajaxSourceData.objListIsExists(_data.creditCardAllAccountsResultDTO.noticeData);
                        }
                    }

                    //绑定顶部的模块
                    newIndexDomBind.modSummaryBind(summaryData);

                    //TAB
                    var flowInfo = $('.flowInfo .flowList'),
                        _savsGraph = $('.savsGraph'),
                        _creditGraph = $('.creditGraph'),
                        _debitCardData = newIndexDomBind.getValue(summaryData, 'debitCardData', summaryData.debitCardData),
                        _creditCardData = newIndexDomBind.getValue(summaryData, 'creditCardData', summaryData.creditCardData);

                    if (_creditCardData !== false && _debitCardData === false) {
                        hTu.overallLayout([_savsGraph, _creditGraph, 0, 1, 'credit', flowInfo]);
                    } else {
                        hTu.overallLayout([_creditGraph, _savsGraph, 1, 0, 'debit', flowInfo]);
                    }
                }
            }, '获取汇总数据失败', function() {}, function() {});
        },
        responseCode: function(data) {
            if (data.code === 'success') {
                return true;
            } else {
                return false;
            }
        }
    };
    var newIndexDomBind = {
        parameters: {
            _mod_tip: $('.mod_tip'),
            _mod_summary: $('.mod_summary'),
            _mod_tabList: $('.mod_tabList'),
            _savsGraph_mod_btn_month: $('.savsGraph .mod_btn_month'),
            _creditGraph_mod_btn_month: $('.creditGraph .mod_btn_month'),
            _creditT: $('.creditGraph .creditT')
        },
        /**
         * [getValue 判断对象是否有]
         * @param  {[type]} obj        [对象]
         * @param  {[type]} key        [键名，属性字段]
         * @param  {[type]} labelValue [要返回的值]
         * @return {[type]}            [description]
         */
        getValue: function(obj, key, labelValue) {
            var result = obj[key];
            if (undefined === result || null === result) {
                result = false;
            }
            if (labelValue != '') {
                retult = labelValue;
            }
            return result;
        },
        /**
         * [mod_noticeBind 通告]
         * @param  {[type]} id        [id]
         * @param  {[type]} arrayName [填充的数组]
         * @param  {[type]} obj       [对象]
         * @return {[type]}           [description]
         */
        mod_noticeBind: function(id, arrayName, obj) {
            var obj_notice = obj;
            arrayName.push('<div id="' + id + '" class="tipContent clearfix"><ul class="sliderbox clearfix">');
            for (var i = 0; i < obj_notice.length; i++) {
                arrayName.push('<li><i class="icon_tip"></i>' +
                    '<a id="' + obj_notice[i].orgId + ',' + obj_notice[i].cardNo + ','+'credit'+'" href="javascript:;" class="description">' + obj_notice[i].deposits + '</a>' +
                    '<a id="' + obj_notice[i].noticeId + '" class="tipC" href="javascript:;">不再提醒</a></li>');
            }
            arrayName.push('</ul></div>');
        },
        /**
         * [mod_cardTotalBind 汇总数据模块]
         * @param  {[type]} className [样式名]
         * @param  {[type]} obj       [对象]
         * @return {[type]}           [description]
         */
        mod_cardTotalBind: function(className, obj) {
            var _obj = [className, obj.title, obj.currencySymbols, obj.price],
                _iconType = '',
                _w34F = '';
            if (className.indexOf('totalDeposits') > -1 || className.indexOf('availableAmount') > -1) {
                _iconType = '<i class="iconType"></i>';
            }
            
            if (_obj[0] === 'w4 notice') {
                _w34F = 'style="display:block"';
            }

            return '<span class="' + _obj[0] + '" ' + _w34F + ' >' + _iconType +
                '<b class="title">' + _obj[1] + '</b>' +
                '<strong class="price">' + _obj[2] + _obj[3] + '</strong>' +
                '</span>';
        },
        /**
         * [mod_flowInfoDom 储蓄卡和信用卡流水列表]
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        mod_flowInfoDom: function(obj,cardType) {
            var _tableFlow = [],
                _obj = [],
                _Price = function(_obj) {
                    return '<td class="' + _obj[0] + '"><a  id="' + _obj[1] + ',' + _obj[3]+','+cardType + '" href="javascript:void(null);"><span>' + _obj[2] + '</span></a></td>';
                },
                _dingPrice = '',
                _noticePrice = '';

            for (var i = 0; i < obj.flowListTr.length; i++) {
                _obj = [obj.flowListTr[i].title, obj.flowListTr[i].demandDeposits, obj.flowListTr[i].totalDeposits, obj.flowListTr[i].orgId, obj.flowListTr[i].cardNo, obj.flowListTr[i].cardType, obj.flowListTr[i].demandClassName, obj.flowListTr[i].totalClassName];
                _tableFlow.push('<tr class="' + obj.flowListTr[i].trClass + '">');

                for (var j = 0; j < obj.titleList.length; j++) {
                    if (obj.titleList[j] === '定期存款') {
                        if (newIndexDomBind.getValue(obj.flowListTr[i], 'dingPrice', obj.flowListTr[i].dingPrice) !== false) {
                            _dingPrice = _Price([obj.flowListTr[i].dingClassName, obj.flowListTr[i].orgId, obj.flowListTr[i].dingPrice, obj.flowListTr[i].cardNo]);
                        }
                    }
                    if (obj.titleList[j] === '通知存款') {
                        if (newIndexDomBind.getValue(obj.flowListTr[i], 'noticePrice', obj.flowListTr[i].noticePrice) !== false) {
                            _noticePrice = _Price([obj.flowListTr[i].noticeClassName, obj.flowListTr[i].orgId, obj.flowListTr[i].noticePrice, obj.flowListTr[i].cardNo]);
                        }
                    }
                }

                _tableFlow.push(
                    '<td class="title"><a id="' + _obj[3] + ',' + _obj[4]+','+cardType + '" href="javascript:void(null);"><span>' + _obj[0] + '</span></a></td>' +
                    '<td class="' + _obj[6] + '"><a id="' + _obj[3] + ',' + _obj[4]+','+cardType + '" href="javascript:void(null);"><span>' + _obj[1] + '</span></a></td>' +
                    _dingPrice +
                    _noticePrice +
                    '<td class="' + _obj[7] + '"><a  id="' + _obj[3] + ',' + _obj[4]+','+cardType + '" href="javascript:void(null);"><span>' + _obj[2] + '</span></a></td>');
                _tableFlow.push('</tr>');
            }
            return _tableFlow;
        },
        /**
         * [modSummaryBind 绑定汇总数据]
         * @return {[type]} [description]
         */
        modSummaryBind: function(summaryData) {
            var _summary_debit = [],
                _summary_credit = [],
                _noticeData = [],
                _noticeData_repaymentNotice = [],
                _noticeData_recommendedNotice = [],
                _debitCardData = this.getValue(summaryData, 'debitCardData', summaryData.debitCardData),
                _creditCardData = this.getValue(summaryData, 'creditCardData', summaryData.creditCardData),
                _dom = '',
                len = 2;
            //信用卡
            if (_creditCardData !== false) {
                newIndexDomBind.parameters._mod_tip.find('.tipContent').addClass('hide');
                newIndexDomBind.parameters._mod_summary[0].className = 'mod_summary clearfix';
                newIndexDomBind.parameters._mod_summary.addClass('credit');
                _summary_credit.push('<span class="w1 pic">' +
                    '<i class="icon"></i>' +
                    '<b class="title">信用额度</b>' +
                    '</span>');
                if (this.getValue(_creditCardData, 'overdrawnAmount', _creditCardData.overdrawnAmount)) {
                    _summary_credit.push(newIndexDomBind.mod_cardTotalBind('w6 overdrawnAmount', _creditCardData.overdrawnAmount));
                }
                if (this.getValue(_creditCardData, 'availableAmount', _creditCardData.availableAmount)) {
                    _summary_credit.push(newIndexDomBind.mod_cardTotalBind('w7 availableAmount', _creditCardData.availableAmount));
                }
                if (this.getValue(_creditCardData, 'noticeData', _creditCardData.noticeData)) {
                    //两类通知
                    var _repaymentNotice = this.getValue(_creditCardData.noticeData, 'repaymentNotice', _creditCardData.noticeData.repaymentNotice),
                        _recommendedNotice = this.getValue(_creditCardData.noticeData, 'recommendedNotice', _creditCardData.noticeData.recommendedNotice);
                    _noticeData.push('<div class="w8 tipList">');

                    if (_repaymentNotice && _repaymentNotice.length > 0) {
                        _noticeData[0] = '<div class="w8 tipList one">';
                        newIndexDomBind.mod_noticeBind('sliderbox1', _noticeData_repaymentNotice, _creditCardData.noticeData.repaymentNotice);
                    }
                    if (_recommendedNotice && _recommendedNotice.length > 0) {
                        _noticeData[0] = '<div class="w8 tipList one">';
                        newIndexDomBind.mod_noticeBind('sliderbox2', _noticeData_recommendedNotice, _creditCardData.noticeData.recommendedNotice);
                    }
                    if (_repaymentNotice !== false && _repaymentNotice.length > 0 && _recommendedNotice !== false && _recommendedNotice.length > 0) {
                        _noticeData[0] = '<div class="w8 tipList two">';
                    }
                    _noticeData.push('</div>');

                    _summary_credit.push(_noticeData[0] + _noticeData_repaymentNotice.join('') + _noticeData_recommendedNotice.join('') + _noticeData[1]);
                }
                len = _summary_credit.length - 1; //列表和WI抵消掉
            }
            //储蓄卡
            if (_debitCardData !== false) {
                newIndexDomBind.parameters._mod_tip.find('.tipContent').addClass('hide');
                newIndexDomBind.parameters._mod_summary[0].className = 'mod_summary clearfix';
                newIndexDomBind.parameters._mod_summary.addClass('savings');
                _summary_debit.push('<span class="w1 pic">' +
                    '<i class="icon"></i>' +
                    '<b class="title">储蓄存款</b>' +
                    '</span>');
                if (this.getValue(_debitCardData, 'demandDeposits', _debitCardData.demandDeposits)) {
                    _summary_debit.push(newIndexDomBind.mod_cardTotalBind('w2 demand', _debitCardData.demandDeposits));
                }
                if (this.getValue(_debitCardData, 'deposits', _debitCardData.deposits)) {
                    _summary_debit.push(newIndexDomBind.mod_cardTotalBind('w3 periodical', _debitCardData.deposits));
                }
                if (this.getValue(_debitCardData, 'callDeposit', _debitCardData.callDeposit)) {
                    _summary_debit.push(newIndexDomBind.mod_cardTotalBind('w4 notice', _debitCardData.callDeposit));
                }
                if (this.getValue(_debitCardData, 'totalDeposits', _debitCardData.totalDeposits)) {
                    _summary_debit.push(newIndexDomBind.mod_cardTotalBind('w5 totalDeposits', _debitCardData.totalDeposits));
                }
                len = _summary_debit.length - 1; //为了去掉W1
            }
            //储蓄卡和信用卡都有
            if (_debitCardData !== false && _creditCardData !== false) {
                newIndexDomBind.parameters._mod_summary[0].className = 'mod_summary clearfix';
                newIndexDomBind.parameters._mod_summary.addClass('allCard');
                //判断通知在没
                if (this.getValue(_creditCardData, 'noticeData', _creditCardData.noticeData)) {
                    var _repaymentNotice = this.getValue(_creditCardData.noticeData, 'repaymentNotice', _creditCardData.noticeData.repaymentNotice),
                        _recommendedNotice = this.getValue(_creditCardData.noticeData, 'recommendedNotice', _creditCardData.noticeData.recommendedNotice),
                        _tallNotice = [],
                        _tallNoticeTemp = [];

                    if (_repaymentNotice) {
                        for (var i = 0; i < _creditCardData.noticeData.repaymentNotice.length; i++) {
                            _tallNotice.push(_creditCardData.noticeData.repaymentNotice[i]);
                        }
                    }
                    if (_recommendedNotice) {
                        for (var i = 0; i < _creditCardData.noticeData.recommendedNotice.length; i++) {
                            _tallNotice.push(_creditCardData.noticeData.recommendedNotice[i]);
                        }
                    }
                    newIndexDomBind.mod_noticeBind('sliderbox3', _tallNoticeTemp, _tallNotice);
                    newIndexDomBind.parameters._mod_tip.empty();
                    newIndexDomBind.parameters._mod_tip.append(_tallNoticeTemp.join(''));
                    newIndexDomBind.parameters._mod_tip.find('.tipContent').removeClass('hide');
                }
            }

            switch (len) {
                case 2:
                    newIndexDomBind.parameters._mod_summary.addClass('two');
                    break;
                case 3:
                    newIndexDomBind.parameters._mod_summary.addClass('three');
                    break;
                case 4:
                    newIndexDomBind.parameters._mod_summary.addClass('four');
                    break;
            }
            _dom = _summary_debit.join('') + _summary_credit.join('');
            newIndexDomBind.parameters._mod_summary.empty();
            newIndexDomBind.parameters._mod_summary.append(_dom);

            this.modTabListDom(summaryData);
            this.lunStart();
        },
        /**
         * [modTabListDom TAB的切换]
         * @return {[type]} [description]
         */
        modTabListDom: function(summaryData) {
            var _debitCardData = this.getValue(summaryData, 'debitCardData', summaryData.debitCardData),
                _creditCardData = this.getValue(summaryData, 'creditCardData', summaryData.creditCardData),
                _tabLi = newIndexDomBind.parameters._mod_tabList.removeClass('hide').find('.tabLi');
            if (_creditCardData !== false) {
                newIndexDomBind.parameters._mod_tabList.addClass('one');
                _tabLi.eq(0).addClass('hide');
                _tabLi.eq(1).removeClass('hide');
            }
            if (_debitCardData !== false) {
                newIndexDomBind.parameters._mod_tabList.addClass('one');
                _tabLi.eq(0).removeClass('hide');
                _tabLi.eq(1).addClass('hide');
            }
            if (_debitCardData !== false && _creditCardData !== false) {
                newIndexDomBind.parameters._mod_tabList.removeClass('one');
                newIndexDomBind.parameters._mod_tabList.addClass('savings');
                _tabLi.eq(0).removeClass('hide');
                _tabLi.eq(1).removeClass('hide');
            }
        },
        flowInfoSwitch: function(obj) {
            var _tableFlow = [];
            _tableFlow.push('<tr>');
            for (var i = 0; i < obj[1].titleList.length; i++) {
                _tableFlow.push('<th>' + obj[1].titleList[i] + '</th>');
            }
            _tableFlow.push('</tr>');
            obj[0] = this.mod_flowInfoDom(obj[1],obj[3]);
            switch (obj[1].titleList.length) {
                case 3:
                    obj[2][0].className = 'flowList ' + obj[3];
                    obj[2].addClass('three');
                    obj[2].find('.more td').attr('colspan', 3);
                    break;
                case 4:
                    obj[2][0].className = 'flowList ' + obj[3];
                    obj[2].addClass('four');
                    obj[2].find('.more td').attr('colspan', 4);
                    break;
                case 5:
                    obj[2][0].className = 'flowList ' + obj[3];
                    obj[2].addClass('five');
                    obj[2].find('.more td').attr('colspan', 5);
                    break;
            };
            obj[5].isPaining === false ? obj[2].find('.more').removeClass('hide') : obj[2].find('.more').addClass('hide');

            if (obj[4] === 'oneInit') {
                var vps=obj[2].find('.more').clone();
                
                obj[2].empty();
                obj[2].append(_tableFlow.join('') + obj[0].join(''));
                obj[2].append(vps);
                //obj[2].find('.more').before(_tableFlow.join('') + obj[0].join(''));
            }
        },
        objIsExistsCurrency: function(o1s, o2s) {
            var result = '';
            if (o2s === '--') {
                result = '--';
            } else {
                result = o1s + o2s;
            }
            return result;
        },
        objCurreny: function(obj) {
            var result = '';
            if (obj === undefined) {
                result = '--';
            } else {
                result = obj[0].currency + obj[0].amount;
            }
            return result;
        },
        debitfuFuns: function(objs) {
            var result = '';

            if (objs === '--') {
                result = 'ganggang';
            } else {
                result = 'positive';
            }

            return result;
        },
        /**
         * [debitFlowDataFun 储蓄卡账单]
         * @param  {[type]} pageNum  [1]
         * @param  {[type]} pageSize [5] isAll显示全部
         * @return {[type]}          [第一次时，默认传[{}]]
         */
        debitFlowDataFun: function(operationData, condition, callbackFun) {
            var _flowList = $('.flowList'),
                _flowListDebit = _flowList.eq(0),
                _flowListCredit = _flowList.eq(1),
                _countName = 'three',
                _debitDatas = '',
                operationData = operationData;
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.depositAccount.searchDepositMediumList?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result,
                        debitFlowData = {
                            isPaining: _data.isLastPage,
                            flowList: {
                                titleList: ['银行卡号'],
                                flowListTr: []
                            }
                        };

                    for (var i = 0; i < _data.accoutTypeList.length; i++) {
                        debitFlowData.flowList.titleList.push(_data.accoutTypeList[i].desc);
                    }

                    for (var j = 0; j < _data.resultList.length; j++) {
                        debitFlowData.flowList.flowListTr.push({
                            trClass: j % 2 === 0 ? 'even' : 'old',
                            orgId: _data.resultList[j].organizationId,
                            cardNo: _data.resultList[j].bankNo,
                            title: _data.resultList[j].bankNameAndNo,
                            demandClassName: newIndexDomBind.debitfuFuns(DataFun.getValue(_data.resultList[j], 'currentBalance', '--', '')),
                            demandDeposits: newIndexDomBind.objIsExistsCurrency(_data.resultList[j].currency, DataFun.getValue(_data.resultList[j], 'currentBalance', '--', '')), //活期存款
                            dingClassName: newIndexDomBind.debitfuFuns(DataFun.getValue(_data.resultList[j], 'fixedBalance', '--', '')),
                            dingPrice: newIndexDomBind.objIsExistsCurrency(_data.resultList[j].currency, DataFun.getValue(_data.resultList[j], 'fixedBalance', '--', '')), //定期存款
                            noticeClassName: newIndexDomBind.debitfuFuns(DataFun.getValue(_data.resultList[j], 'noticeBalance', '--', '')),
                            noticePrice: newIndexDomBind.objIsExistsCurrency(_data.resultList[j].currency, DataFun.getValue(_data.resultList[j], 'noticeBalance', '--', '')), //通知存款
                            totalClassName: newIndexDomBind.debitfuFuns(DataFun.getValue(_data.resultList[j], 'totalBalance', '--', '')),
                            totalDeposits: newIndexDomBind.objIsExistsCurrency(_data.resultList[j].currency, DataFun.getValue(_data.resultList[j], 'totalBalance', '--', '')) //总存款
                        });
                    }

                    callbackFun(debitFlowData);
                    newIndexDomBind.flowInfoSwitch([_debitDatas, debitFlowData.flowList, _flowListDebit, 'debit', condition, debitFlowData]);

                }
            }, '获取储蓄卡账户列表失败', function() {}, function() {

            });
        },
        zhengfuFun: function(objs) {
            var result = '';
            if (objs > 0) {
                result = 'positive';
            } else {
                result = 'negative';
            }

            if (objs === '--') {
                result = 'ganggang';
            }

            return result;
        },
        zhengfuFuns: function(objs, key) {
            var result = '';
            if (key === 'available') {
                result = 'vals';
            }

            if (objs === '--') {
                result = 'ganggang';
            }

            return result;
        },
        /**
         * [creditFlowData 信用卡账单]
         * @param  {[type]} pageNum  [1]
         * @param  {[type]} pageSize [5] isAll显示全部
         * @return {[type]}          [description]
         */
        creditFlowDataFun: function(operationData, condition, callbackFun) {
            var _flowList = $('.flowList'),
                _flowListDebit = _flowList.eq(0),
                _flowListCredit = _flowList.eq(1),
                _countName = 'three',
                _creditDatas = '',
                operationData = operationData;
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.credit.getCreditAllAccount?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result,
                        creditFlowData = {
                            isPaining: _data.isLastPage,
                            flowList: {
                                titleList: ['银行卡号', '已透支金额', '可用金额'],
                                flowListTr: []
                            }
                        };
                    for (var j = 0; j < _data.accountList.length; j++) {
                        creditFlowData.flowList.flowListTr.push({
                            trClass: j % 2 === 0 ? 'even' : 'old',
                            orgId: _data.accountList[j].orgId,
                            cardNo: _data.accountList[j].cardNo,
                            title: _data.accountList[j].cardDesc,
                            demandClassName: newIndexDomBind.zhengfuFun(newIndexDomBind.objCurreny(_data.accountList[j].total)),
                            demandDeposits: newIndexDomBind.objCurreny(_data.accountList[j].total), //已透支金额
                            totalClassName: newIndexDomBind.zhengfuFuns(newIndexDomBind.objCurreny(_data.accountList[j].available), 'available'),
                            totalDeposits: newIndexDomBind.objCurreny(_data.accountList[j].available) //可用金额
                        });
                    }
                    callbackFun(creditFlowData);
                    newIndexDomBind.flowInfoSwitch([_creditDatas, creditFlowData.flowList, _flowListCredit, 'credit', condition, creditFlowData]);
                }
            }, '获取信用卡账户列表', function() {}, function() {});
        },
        updateNoticeState: function(operationData, callbackFun) {
            var operationData = operationData;
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.bdc.data.bankhome.notice.cancel?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result;
                    callbackFun(_data);
                }
            }, '获取所有储蓄卡列表数据', function() {}, function() {});
        },
        /**
         * [debitCardListDataFun 所有储蓄卡数据]
         * @param  {[type]} operationData [description]
         * @param  {[type]} callbackFun   [description]
         * @return {[type]}               [description]
         */
        debitCardListDataFun: function(operationData, callbackFun) {
            var operationData = operationData;
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.deposit.getAllDepositCardInfo?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result,
                        debitCardListData = [];
                    for (var i = 0; i < _data.length; i++) {
                        debitCardListData.push({
                            mediumId: _data[i].mediumId,
                            organizationId: _data[i].organizationId,
                            bankName: _data[i].bankName,
                            mediumNo: _data[i].mediumNo
                        });
                    }
                    callbackFun(debitCardListData);
                }
            }, '获取所有储蓄卡列表数据', function() {}, function() {});
        },
        /**
         * [debitIncomePayDataFun 储蓄卡图表数据及LABELlIST]
         * @param  {[type]} operationData [description]
         * @param  {[type]} callbackFun   [description]
         * @return {[type]}               [description]
         */
        debitIncomePayDataFun: function(operationData, callbackFun) {
            var operationData = operationData;
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.deposit.tradedetail.show?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result,
                        debitIncomePayData = {
                            flag: _data.flag,
                            labelList: [],
                            monthData: [],
                            incomeData: [],
                            expenditureData: [],
                            balance: []
                        };

                    for (var i = 0; i < _data.labelList.length; i++) {
                        debitIncomePayData.labelList.push({
                            className: _data.labelList[i].selected === 'true' ? 'sled' : '',
                            labelYear: _data.labelList[i].labelYear,
                            value: _data.labelList[i].value
                        });
                    }

                    debitIncomePayData.monthData = _data.monthData;
                    debitIncomePayData.incomeData = _data.incomeData;
                    debitIncomePayData.expenditureData = _data.expenseditureData;
                    debitIncomePayData.balance = _data.balance;

                    callbackFun(debitIncomePayData);
                }
            }, '获取储蓄卡图表数据', function() {}, function() {});
        },
        /**
         * [timeClassNameFun 时间轴样式]
         * @return {[type]} [description]
         */
        timeClassNameFun: function(obj) {
            var result = [];

            result.push(obj[0] === 0 ? 'first' : '');

            result.push(obj[0] === obj[4] ? 'last' : '');

            result.push(obj[0] % 2 === 0 ? 'even' : 'old');

            result.push(parseFloat(obj[1]) > 0 ? 'positive' : 'negative');

            result.push(obj[2] === true ? '' : 'future');

            result.push(obj[3] === true ? 'hover' : '');

            return result.join(' ');
        },
        /**
         * [creditBillingDataFun 信用卡图表数据及LABELlIST]
         * @param  {[type]} operationData [description]
         * @param  {[type]} callbackFun   [description]
         * @return {[type]}               [description]
         */
        creditBillingDataFun: function(operationData, callbackFun) {
            var operationData = operationData;
            DataFun.ajaxFun(DataFun._gwPath + '/default/bank.bdc.data.bankhome.credit.detail.statistics?operationData=' + operationData, function(data) {
                if (ajaxSourceData.responseCode(data)) {
                    var _data = data.result,
                        creditBillingData = {
                            labelList: [],
                            seriesData: [],
                            totalBill: {
                                totalBillList: []
                            },
                            monthPriceList: []
                        };

                    for (var i = 0; i < _data.labelList.length; i++) {
                        creditBillingData.labelList.push({
                            className: _data.labelList[i].isSelected === true ? 'sled' : '',
                            labelYear: _data.labelList[i].labelYear,
                            value: _data.labelList[i].value
                        });
                    }
                    if (DataFun.getValue(_data, 'billTradeStatistics', '', '') !== '') {
                        for (var i = 0; i < _data.billTradeStatistics.tradeCategoryList.length; i++) {
                            creditBillingData.seriesData.push({
                                name: _data.billTradeStatistics.tradeCategoryList[i].tradeCategoryName,
                                value: _data.billTradeStatistics.tradeCategoryList[i].tradeExpense
                            });
                        }
                    }


                    creditBillingData.totalBill.months = _data.monthBill.monthTotalBill.amountDesc;
                    creditBillingData.totalBill.currency = DataFun.getValue(_data.monthBill.monthTotalBill, 'currency', '', '');
                    creditBillingData.totalBill.price = DataFun.getValue(_data.monthBill.monthTotalBill, 'amount', '--', '');

                    if (DataFun.getValue(_data.monthBill, 'monthBillList', '', '') !== '') {
                        for (var i = 0; i < _data.monthBill.monthBillList.length; i++) {
                            creditBillingData.totalBill.totalBillList.push({
                                isNotice: _data.monthBill.monthBillList[i].isNotice,
                                noticeId: DataFun.getValue(_data.monthBill.monthBillList[i], 'noticeId', '', ''),
                                organizationId: _data.monthBill.monthBillList[i].orgId,
                                bankName: _data.monthBill.monthBillList[i].amount.amountDesc,
                                mediumNo: _data.monthBill.monthBillList[i].cardNo,
                                currency: _data.monthBill.monthBillList[i].amount.currency,
                                price: _data.monthBill.monthBillList[i].amount.amount
                            });
                        }
                    }

                    for (var i = 0; i < _data.monthPriceList.length; i++) {
                        creditBillingData.monthPriceList.push({
                            isFuture: _data.monthPriceList[i].canClick === true ? false : true,
                            months: _data.monthPriceList[i].month,
                            className: newIndexDomBind.timeClassNameFun([
                                i, DataFun.getValue(_data.monthPriceList[i], 'amount', '', ''), _data.monthPriceList[i].canClick, _data.monthPriceList[i].isDefaultMonth, _data.monthPriceList.length - 1
                            ]), //'old negative first',even negative,old negative,old positive hover
                            currency: DataFun.getValue(_data.monthPriceList[i], 'currency', '', ''), //结余&yen;
                            totalPrices: _data.monthPriceList[i].canClick === false ? DataFun.getValue(_data.monthPriceList[i], 'amount', '', '') : DataFun.getValue(_data.monthPriceList[i], 'amount', '--', ''),
                            traditional: DataFun.getValue(_data.monthPriceList[i], 'yearMonth', '', '')
                        });
                    }

                    callbackFun(creditBillingData);
                }
            }, '获取信用卡图表数据', function() {}, function() {});
        },
        /**
         * [modFlowInfoBind 流水绑定及图片切换]
         * @param  {[type]} id        [description]
         * @param  {[type]} condition [description]
         * @return {[type]}           [description]
         */
        modFlowInfoBind: function(id, condition) {
            if (id === 'debit') {
                //绑定表格储蓄卡
                if (condition === 'oneInit') {
                    newIndexDomBind.debitFlowDataFun('["1","5"]', condition, function() {});
                    newIndexDomBind.debitCardListDataFun('[]', function(debitCardListData) {
                        //所有卡列表下拉
                        newIndexDomBind.cardAllsBind(debitCardListData);
                        _editPersonalCenterObject.initFun();
                    });
                }
                newIndexDomBind.debitIncomePayDataFun('[{}]', function(debitIncomePayData) {
                    if (condition === 'oneInit') {
                        //月份label绑定
                        newIndexDomBind.savsGraphModBtnMonthBind(debitIncomePayData);
                    }
                    newIndexDomBind.modSavsGraph(debitIncomePayData);
                });
            }
            if (id === 'credit') {
                if (condition === 'oneInit') {
                    newIndexDomBind.creditFlowDataFun('["1","5"]', condition, function() {});
                }
                newIndexDomBind.creditBillingDataFun('[{}]', function(creditBillingData) {
                    if (condition === 'oneInit') {
                        //信用卡某月总账单列表
                        newIndexDomBind.creditTBind(creditBillingData);
                        //信用卡时间轴
                        newIndexDomBind.timeLineListBind(creditBillingData);
                        //月份label绑定
                        newIndexDomBind.creditGraphModBtnMonthBind(creditBillingData);
                    }
                    newIndexDomBind.modCreditGraph(creditBillingData);
                });
            }
        },
        /**
         * [GraphModBtnMonthBind 月份label绑定]
         * @param {[type]} debitIncomePayData [description]
         */
        GraphModBtnMonthBind: function(obj, btnMonth) {
            var labelList = this.getValue(obj, 'labelList', obj.labelList),
                labelArray = [];
            if (labelList !== false) {
                for (var i = 0; i < labelList.length; i++) {
                    labelArray.push('<a class="btn_G ' + labelList[i].className + '" id="' + labelList[i].value + '" href="javascript:;">' + labelList[i].labelYear + '</a>');
                }
            }
            btnMonth.empty();
            btnMonth.append(labelArray.join(''));
        },
        /**
         * [savsGraphModBtnMonthBind 储蓄卡月份绑定]
         * @return {[type]} [description]
         */
        savsGraphModBtnMonthBind: function(debitIncomePayData) {
            newIndexDomBind.GraphModBtnMonthBind(debitIncomePayData, newIndexDomBind.parameters._savsGraph_mod_btn_month);
        },
        /**
         * [creditGraphModBtnMonthBind description]
         * @return {[type]} [description]
         */
        creditGraphModBtnMonthBind: function(creditBillingData) {
            newIndexDomBind.GraphModBtnMonthBind(creditBillingData, newIndexDomBind.parameters._creditGraph_mod_btn_month);
        },
        /**
         * [modSavsGraph 储蓄卡图表绑定]
         * @return {[type]} [description]
         */
        modSavsGraph: function(obj) {
            var _savsGraph = hTu.DrawObj('main1');
            hTu.DrawMethod(_savsGraph, hTu.savsGraphSetting(obj));
        },
        modCreditGraph: function(obj) {
            var _creditGraph = hTu.DrawObj('main2');
            hTu.DrawMethod(_creditGraph, hTu.creditGraphSetting(obj));
        },
        /**
         * [cardAllsBind 储蓄卡列表绑定]
         * @return {[type]} [description]
         */
        cardAllsBind: function(debitCardListData) {
            var cardArray = ['<p value="所有储蓄卡">所有储蓄卡</p>'],
                _cardAlls = $('#cardAlls');
            for (var i = 0; i < debitCardListData.length; i++) {
                cardArray.push('<p value="' + debitCardListData[i].organizationId + ',' + debitCardListData[i].mediumId + '">' + debitCardListData[i].bankName + '尾号' + debitCardListData[i].mediumNo + '</p>');
            }
            _cardAlls.empty();
            _cardAlls.append(cardArray.join(''));

            //给select添加事件
        },
        /**
         * [creditTBind 信用卡某月总账单列表]
         * @param  {[type]} creditBillingData [description]
         * @return {[type]}                   [description]
         */
        creditTBind: function(creditBillingData) {
            var billArray = [],
                _obj = creditBillingData.totalBill,
                currentMonth = $('#currentMonth'),
                currentPrice = $('#currentPrice'),
                _open = function(obj) {
                    if (obj.isNotice) {
                        return '<div class="iconWar">' +
                            '<div class="tipTht hide">' +
                            '<i class="jiao"></i>' +
                            '<span class="bgTht"></span>' +
                            '<span class="tht">本期账单金额较高<u id="' + obj.organizationId + ',' + obj.mediumNo+',credit' + '" noticeId="' + obj.noticeId + '" class="thtClick">点击查看详情</u></span>' +
                            '</div>' +
                            '</div>';
                    } else {
                        return '';
                    }
                };
            currentMonth.text(_obj.months + '月总账单');
            currentPrice[0].innerHTML = _obj.currency + _obj.price;

            for (var i = 0; i < _obj.totalBillList.length; i++) {
                billArray.push('<li class="creditChild '+(i===0?'one':'')+'">' +
                    '<a href="javascript:;">' +
                    '<span class="title">' + _obj.totalBillList[i].bankName + '&nbsp;尾号' + _obj.totalBillList[i].mediumNo + '</span>' +
                    '<span class="price">' + _obj.totalBillList[i].currency + _obj.totalBillList[i].price + _open(_obj.totalBillList[i]) + '</span>' +
                    '</a>' +
                    '</li>');
            }
            newIndexDomBind.parameters._creditT.empty();
            if (billArray.length > 0) {
                newIndexDomBind.parameters._creditT.append(billArray.join(''));
            } else {
                newIndexDomBind.parameters._creditT.append('<li class="noCount">数据未获取</li>');
            }
        },
        /**
         * [timeLineListBind 信用卡时间轴]
         * @param  {[type]} creditBillingData [description]
         * @return {[type]}                   [description]
         */
        timeLineListBind: function(creditBillingData) {
            var _timeLineList = $('#timeLineList'),
                _timeArray = [],
                _creditBillingData = creditBillingData.monthPriceList,
                _dom = function(obj) {
                    var vprice = 0;
                    //obj.isFuture 为false代表可点击; true代表不可点击，是指未来的月份
                    if (obj.isFuture === false) {
                        vprice = DataFun.getValue(obj, 'currency', '', '') + DataFun.getValue(obj, 'totalPrices', '--', '');
                    } else {
                        vprice = DataFun.getValue(obj, 'currency', '', '') + DataFun.getValue(obj, 'totalPrices', '', '');
                    }
                    return '<li class="' + obj.className + '">' +
                        '<a class="cliBtn" href="javascript:;"></a><input type="hidden" value="' + obj.traditional + '"><span class="price">' + obj.months + '月<b>&nbsp;' + vprice + '</b><i class="iconJiao"></i></span></li>';
                };
            for (var i = 0; i < _creditBillingData.length; i++) {
                _timeArray.push(_dom(_creditBillingData[i]));
            }
            _timeLineList.empty();
            _timeLineList.append(_timeArray.join(''));
        },
        /**
         * [lunStart 通告轮播]
         * @return {[type]} [description]
         */
        lunStart: function() {
            function panF(id, times) {
                if (!DataFun.hasDisPlay(id)) {
                    $(id).marquee({
                        auto: true,
                        interval: times,
                        showNum: 1,
                        stepLen: 1,
                        type: 'vertical'
                    });
                }
            }

            function idF(id, times) {
                if (DataFun.hasElement(id)) {
                    var autoTimes = false;
                    if ($('#' + id + ' li').length > 1) {
                        autoTimes = true;
                    }
                    $('#' + id).marquee({
                        auto: autoTimes,
                        interval: times,
                        showNum: 1,
                        stepLen: 1,
                        type: 'vertical'
                    });
                }
            }

            function hasF(id, times) {
                switch (id) {
                    case '#sliderbox1':
                        if (!DataFun.hasDisPlay('.w8')) {
                            idF('sliderbox1', 5000);
                        };
                        break;
                    case '#sliderbox2':
                        if (!DataFun.hasDisPlay('.w8')) {
                            idF('sliderbox2', 8000);
                        };
                        break;
                    case '#sliderbox3':
                        idF('sliderbox3', 5000);
                        break;
                }
            }

            hasF('#sliderbox1');
            hasF('#sliderbox2');
            hasF('#sliderbox3');

            var sliderbox = $('.sliderbox');
            sliderbox.on('click', 'li .tipC', function() {
                var _thisv = $(this).parents('li'),
                    _thisLi = $(this).parents('ul').find('li').length;
                hasF('#sliderbox1');
                hasF('#sliderbox2');
                hasF('#sliderbox3');
                var _noticeId = $(this).attr('id');
                if (_noticeId > 0) {
                    newIndexDomBind.updateNoticeState('[' + _noticeId + ']', function(data) {
                        if (data === true) {
                            var _id = _thisv.parents('.tipContent').attr('id');
                            //如果是最后一条，将父级框也删除
                            if (_thisLi === 1) {
                                _thisv.parents('.tipContent').remove();
                                if ('sliderbox1' === _id || 'sliderbox2' === _id) {
                                    ajaxSourceData.summaryDataAjax();
                                }
                            } else {
                                _thisv.remove();
                            }
                        }
                    });
                }
            });
        }
    };
    var _editPersonalCenterObject = {
        oActiv: "",
        //selecte 模拟
        selectClick: function() {
            var _hdTypeMenu = $(".hd_order_menu"),
                _hdVoucherTypeList = $(".hd_order_list"),
                _dom = $(document);


            _hdTypeMenu.removeClass("hover");
            _hdVoucherTypeList.addClass("hide");

            _dom.click(function(event) {
                var eo = $(event.target);
                if ($(".hd_order_menu").is(":visible") && eo.attr("class") != "hd_order_list") {
                    _editPersonalCenterObject.oActiv = "";
                    _hdVoucherTypeList.addClass("hide");
                    _hdTypeMenu.removeClass("hover");
                }
            });
            _hdTypeMenu.unbind("click").bind("click", function(e) {
                _hdVoucherTypeList.addClass("hide");
                _hdTypeMenu.removeClass("hover");
                $(this).addClass("hover");
                //$(this).parent().find("div").addClass("hd_order_listHover");
                $(this).parent().find("div").removeClass("hide");
                e.stopPropagation();

                if (_editPersonalCenterObject.oActiv == "") {
                    _editPersonalCenterObject.oActiv = $(this).attr("_dateId");
                    $(this).addClass("hover");
                    //$(this).parent().find("div").addClass("hd_order_listHover");
                    $(this).parent().find("div").removeClass("hide");
                    e.stopPropagation();
                } else {
                    if (_editPersonalCenterObject.oActiv == $(this).attr("_dateId")) {
                        _editPersonalCenterObject.oActiv = "";
                        _hdVoucherTypeList.addClass("hide");
                        _hdTypeMenu.removeClass("hover");
                    } else {
                        _editPersonalCenterObject.oActiv = $(this).attr("_dateId");
                        $(this).addClass("hover");
                        //$(this).parent().find("div").addClass("hd_order_listHover");
                        $(this).parent().find("div").removeClass("hide");
                        e.stopPropagation();
                    }
                }
            });
            _hdVoucherTypeList.unbind("click").bind("click", function(e) {
                _hdVoucherTypeList.addClass("hide");
                _hdTypeMenu.removeClass("hover");

                //$(this).removeClass("hd_order_listHover");
                $(this).parent().find("a").removeClass("hover");
                $(this).parent().find("a").removeClass("selected");
                $(this).addClass("hide");
                e.stopPropagation();
            });
        },
        //条件选择
        selectChange: function() {
            var _hdVoucherTypeList = $(".hd_bo p");
            //条件选择获取值
            _hdVoucherTypeList.unbind("click").bind("click", function(e) {
                _editPersonalCenterObject.oActiv = "";
                var _pvThis = $(this).parent().parent().parent();
                $(this).addClass("hover").siblings().removeClass("hover");
                _pvThis.find("div").addClass("hide");
                _pvThis.find("a").removeClass("selected");
                _pvThis.find("a").removeClass("hover");

                _pvThis.find("span")[0].innerHTML = '<input type="hidden" value="' + $(this).attr('value') + '">' + $.trim($(this).text());
                e.stopPropagation();

                var _para = [],
                    _values = $(this).attr('value').split(','),
                    _id = $('.savsGraph .mod_btn_month .sled').attr('id');

                _para.push('"displayCode":"' + _id + '"');
                if (_values[0] === '所有储蓄卡') {
                    _para.push('"mediumId":"all"');
                } else {
                    _para.push('"organizationId":"' + _values[0] + '"');
                    _para.push('"mediumId":"' + _values[1] + '"');
                }

                newIndexDomBind.debitIncomePayDataFun('[{' + _para.join(',') + '}]', function(debitIncomePayData) {
                    newIndexDomBind.modSavsGraph(debitIncomePayData);
                });
            });
        },
        //IE6下拉列表hover样式
        selectHover: function() {
            //IE6下拉列表hover样式
            if ($.browser.msie && ($.browser.version == "6.0")) {
                var _hdVoucherTypeList = $(".hd_bo p")
                _hdVoucherTypeList.live("mouseenter", function(e) {
                    var _this = $(this);
                    _this.addClass("hover");
                    e.stopPropagation();
                });
                _hdVoucherTypeList.live("mouseleave", function(e) {
                    var _this = $(this);
                    _this.removeClass("hover");
                    e.stopPropagation();
                });
                //IE6下max-height处理
                for (var i = 0; i < $(".hd_order_list").length; i++) {
                    if ($(".hd_bo").eq(i).find("p").length > 10) {
                        $(".hd_bo").eq(i).css({
                            "height": "253px",
                            "overflow-y": "scroll"
                        });
                    } else {
                        $(".hd_bo").eq(i).css({
                            "height": $(".hd_order_list").eq(i).height() + "px",
                            "overflow-y": "hidden"
                        });
                    }
                }
            }
        },
        initFun: function() {
            this.selectChange();
            this.selectClick();
            this.selectHover();
        }
    };
    var newIndex = {
        sUpTime: false,
        goTime: null,
        init: function() {
            this.clickFun();
        },
        clickFun: function() {
            var mod_tabList = $('.mod_tabList');
            mod_tabList.on('click', '.tabLi', this.tabList);

            var flowList = $('.flowInfo .flowList');
            flowList.on('click', '.more', this.flowList);

            var creditT = $('.creditGraph .creditList .creditT');
            // creditT.on('mouseenter', '.creditChild .iconWar', this.hoverCreditGraph);
            // creditT.on('mouseleave', '.creditChild .iconWar', function() {
            //     newIndex.CreditGraphTimes($(this));
            // });
            creditT.on('click', '.creditChild .iconWar', function() {
                var _this = $(this);
                
                _this.parents('.creditChild').addClass('front').siblings().removeClass('front');
                $('.creditGraph .creditList .creditT .tipTht').addClass('hide');
                _this.find('.tipTht').removeClass('hide');

            });

            //信用卡某月总账单提醒调用
            $(document).on('click', function(event) {
                var eo = $(event.target),
                    classNames = eo[0].className;
                switch (classNames) {
                    case 'iconWar':
                        break;
                    case 'tht':
                        break;
                    case 'thtClick':
                        var _noticeId = eo.attr('noticeId');
                        if (_noticeId > 0) {
                            newIndexDomBind.updateNoticeState('[' + _noticeId + ']', function(data) {
                                if (data === true) {
                                    eo.parents('.iconWar').remove();
                                }
                            });
                        }
                        break;
                    default:
                        $('.creditGraph .creditList .creditT .tipTht').addClass('hide');
                        break;
                }
            });

            //储蓄卡年份
            var savsGraph_month = $('.savsGraph .mod_btn_month');
            savsGraph_month.on('click', '.btn_G', this.DebitBtn_G);

            //信用卡年份
            var creditGraph_month = $('.creditGraph .mod_btn_month');
            creditGraph_month.on('click', '.btn_G', this.CreditBtn_G);

            //时间轴
            var timeLineList = $('.timeLine .timeLineList');
            timeLineList.on('click', 'li', function() {
                if ($(this).hasClass('future')) {
                    return;
                }
                var vals = $(this).find('input').val(),
                    _id = $('.creditGraph .mod_btn_month .sled').attr('id'),
                    _para = [];

                _para.push('"tabValue":"' + _id + '"');
                _para.push('"billMonth":"' + vals + '"');
                $(this).addClass('hover').siblings().removeClass('hover');
                newIndexDomBind.creditBillingDataFun('[{' + _para.join(',') + '}]', function(creditBillingData) {
                    newIndexDomBind.modCreditGraph(creditBillingData);
                    //信用卡某月总账单列表
                    newIndexDomBind.creditTBind(creditBillingData);

                });
            });
        },
        /**
         * [tabList 切换储蓄卡信用卡]
         * @return {[type]} [description]
         */
        debitCount: 1, //一开始就加载过了，如果一开始就加载过了，就代表DOM已有，只有通过点击更多才可以再追加DOM
        creditCount: 0,
        tabList: function() {
            var _this = $(this),
                _index = _this.index('.tabLi'),
                _savsGraph = $('.savsGraph'),
                _creditGraph = $('.creditGraph');

            switch (_index) {
                case 0:
                    _this.parent().removeClass('credit').addClass('savings');
                    _savsGraph.removeClass('hide');
                    _creditGraph.addClass('hide');
                    newIndex.debitCount++;

                    if (newIndex.debitCount === 1) {
                        newIndexDomBind.modFlowInfoBind('debit', 'oneInit');
                    } else {
                        //为了图动态动
                        //newIndexDomBind.modFlowInfoBind('debit', 'switching');
                    }
                    break;
                case 1:
                    _this.parent().removeClass('savings').addClass('credit');
                    _savsGraph.addClass('hide');
                    _creditGraph.removeClass('hide');
                    newIndex.creditCount++;

                    if (newIndex.creditCount === 1) {
                        newIndexDomBind.modFlowInfoBind('credit', 'oneInit');
                    } else {
                        //为了图动态动
                        //newIndexDomBind.modFlowInfoBind('credit', 'switching');
                    }
                    break;
            }

            _this.addClass('sled').siblings().removeClass('sled');
            _this.parent().parent().find('.flowList').eq(_index).removeClass('hide').siblings('.flowList').addClass('hide');
        },
        /**
         * [flowList 点击更多事件]
         * @return {[type]} [description]
         */
        flowList: function() {
            var _this = $(this),
                _index = _this.attr('id'),
                _dom = '';

            if (_index === 'debit') {
                newIndexDomBind.debitFlowDataFun('["1","isAll"]', 'switching', function(data) {
                    _dom = newIndexDomBind.mod_flowInfoDom(data.flowList);
                    _this.parent().find('.even,.old').remove();
                    _this.before(_dom.join(''));
                });
            }
            if (_index === 'credit') {
                newIndexDomBind.creditFlowDataFun('["1","isAll"]', 'switching', function(data) {
                    _dom = newIndexDomBind.mod_flowInfoDom(data.flowList);
                    _this.parent().find('.even,.old').remove();
                    _this.before(_dom.join(''));
                });
            }
        },
        /**
         * [hoverCreditGraph 信用卡某月总账单 HOVER上去，提示大额度信息]
         * @return {[type]} [description]
         */
        hoverCreditGraph: function(e) {
            newIndex.clearTimes();
            var _this = $(e.target);
            newIndex.sUpTime = false;

            $('.creditGraph .creditList .creditT .tipTht').addClass('hide');
            _this.find('.tipTht').removeClass('hide');
        },
        CreditGraphTimes: function(obj) {
            newIndex.sUpTime = true;
            var count = 2,
                handler = function() {
                    if (count === 1) {
                        if (newIndex.sUpTime) {
                            obj.find('.tipTht').addClass('hide');
                        }
                        newIndex.clearTimes();
                    }
                    count--;
                };
            newIndex.goTime = setInterval(handler, 1000);
        },
        /**
         * [CreditBtn_G 信用卡年份选择]
         * @param {[type]} e [description]
         */
        CreditBtn_G: function(e) {
            var _this = $(e.target),
                _id = _this.attr('id'),
                _para = [],
                _timeLineList = $('#timeLineList'),
                _timeValue = _timeLineList.find('li.hover input').val();

            _this.addClass('sled').siblings().removeClass('sled');

            _para.push('"tabValue":"' + _id + '"');
            newIndexDomBind.creditBillingDataFun('[{' + _para.join(',') + '}]', function(creditBillingData) {
                newIndexDomBind.modCreditGraph(creditBillingData);
                //信用卡某月总账单列表
                newIndexDomBind.creditTBind(creditBillingData);
                //信用卡时间轴
                newIndexDomBind.timeLineListBind(creditBillingData);
            });
        },
        /**
         * [DebitBtn_G 储蓄卡年份选择]
         */
        DebitBtn_G: function(e) {
            var _this = $(e.target),
                _id = _this.attr('id'),
                _selectId = $('.savsGraph .cell_select .hd_order_menu span'),
                _para = [];
            _this.addClass('sled').siblings().removeClass('sled');

            if (_selectId.text() === '所有储蓄卡') {
                _para.push('"mediumId":"all"');
            } else {
                var _values = _selectId.find('input').val().split(',');
                _para.push('"organizationId":"' + _values[0] + '"');
                _para.push('"mediumId":"' + _values[1] + '"');
            }
            _para.push('"displayCode":"' + _id + '"');
            newIndexDomBind.debitIncomePayDataFun('[{' + _para.join(',') + '}]', function(debitIncomePayData) {
                newIndexDomBind.modSavsGraph(debitIncomePayData);
            });
        },
        /**
         * [clearTimes 清除时间]
         * @return {[type]} [description]
         */
        clearTimes: function() {
            clearInterval(newIndex.goTime);
        }
    };
    return newIndex;
});
