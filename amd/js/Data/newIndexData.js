var summaryData = {
    debitCardData: {
        demandDeposits: {
            title: '活期存款',
            currencySymbols: '&yen;',
            price: '130<sub>.00</sub>'
        },
        deposits: {
            title: '定期存款',
            currencySymbols: '&yen;',
            price: '198,220<sub>.00</sub>'
        },
        callDeposit: {
            title: '通知存款',
            currencySymbols: '&yen;',
            price: '1,822,023<sub>.00</sub>'
        },
        totalDeposits: {
            title: '总存款',
            currencySymbols: '&yen;',
            price: '300,000,000<sub>.00</sub>'
        }
    },
    creditCardData: {
        overdrawnAmount: {
            title: '已透支金额',
            currencySymbols: '&yen;',
            price: '-300,000<sub>.00</sub>'
        },
        availableAmount: {
            title: '可用金额',
            currencySymbols: '&yen;',
            price: '198,120<sub>.00</sub>'
        },
        noticeData: {
            repaymentNotice: [{
                id: '1',
                deposits: '中国银行尾号7895卡18号需还款<strong>8,000.00</strong>元。',
                href: 'http://www.24money.com'
            }, {
                id: '2',
                deposits: '中国银行尾号3456卡14号需还款<strong>4,000.00</strong>元。',
                href: 'http://www.24money.com'
            }],
            recommendedNotice: [{
                id: '1',
                deposits: '近期推荐使用工商银行2287(理由：免息期最长)。',
                href: 'http://www.24money.com'
            }, {
                id: '2',
                deposits: '近期推荐使用中国银行5678(理由：免息期最长)。',
                href: 'http://www.24money.com'
            }]
        }
    }
};
var debitFlowData = {
    isPaining: false,
    flowList: {
        titleList: ['银行卡号', '活期存款', '定期存款', '通知存款', '总存款'],
        flowListTr: [{
            trClass: 'old',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '1中国工商银行&nbsp;尾号3341',
            demandClassName: 'positive',
            demandDeposits: '&yen;119,190,000.00', //活期存款
            dingClassName: 'positive',
            dingPrice: '&yen;119,190,000.00', //定期存款
            noticeClassName: 'positive',
            noticePrice: '&yen;119,190,000.00', //通知存款
            totalClassName: 'positive',
            totalDeposits: '&yen;119,190,000.00' //总存款
        }, {
            trClass: 'even',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '2中国工商银行&nbsp;尾号3341',
            demandClassName: 'positive',
            demandDeposits: '&yen;10.00',
            dingClassName: 'ganggang',
            dingPrice: '--', //定期存款
            noticeClassName: 'ganggang',
            noticePrice: '--', //通知存款
            totalClassName: 'positive',
            totalDeposits: '&yen;30.00'
        }, {
            trClass: 'old',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '3中国工商银行&nbsp;尾号3341',
            demandClassName: 'positive',
            demandDeposits: '&yen;90,012.33',
            dingClassName: 'ganggang',
            dingPrice: '--', //定期存款
            noticeClassName: 'ganggang',
            noticePrice: '--', //通知存款
            totalClassName: 'positive',
            totalDeposits: '&yen;90,012.33'
        }, {
            trClass: 'even',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '4中国工商银行&nbsp;尾号3341',
            demandClassName: 'positive',
            demandDeposits: '&yen;119,190,000.00',
            dingClassName: 'ganggang',
            dingPrice: '--', //定期存款
            noticeClassName: 'ganggang',
            noticePrice: '--', //通知存款
            totalClassName: 'positive',
            totalDeposits: '&yen;119,190,000.00'
        }, {
            trClass: 'old',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '5中国工商银行&nbsp;尾号3341',
            demandClassName: 'positive',
            demandDeposits: '&yen;119,190,000.00',
            dingClassName: 'ganggang',
            dingPrice: '--', //定期存款
            noticeClassName: 'ganggang',
            noticePrice: '--', //通知存款
            totalClassName: 'positive',
            totalDeposits: '&yen;119,190,000.00'
        }]
    }
};
var creditFlowData = {
    isPaining: true,
    flowList: {
        titleList: ['银行卡号', '已透支金额', '可用金额'],
        flowListTr: [{
            trClass: 'old',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '1中国工商银行&nbsp;尾号3341',
            demandClassName: 'negative',
            demandDeposits: '&yen;-119,190,000.00',
            totalClassName: 'vals',
            totalDeposits: '&yen;119,190,000.00'
        }, {
            trClass: 'even',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '2中国工商银行&nbsp;尾号3341',
            demandClassName: 'negative',
            demandDeposits: '&yen;-10.00',
            totalClassName: 'vals',
            totalDeposits: '&yen;30.00'
        }, {
            trClass: 'old',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '3中国工商银行&nbsp;尾号3341',
            demandClassName: 'negative',
            demandDeposits: '&yen;-90,012.33',
            totalClassName: 'vals',
            totalDeposits: '&yen;90,012.33'
        }, {
            trClass: 'even',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '4中国工商银行&nbsp;尾号3341',
            demandClassName: 'negative',
            demandDeposits: '&yen;-119,190,000.00',
            totalClassName: 'vals',
            totalDeposits: '&yen;119,190,000.00'
        }, {
            trClass: 'old',
            orgId: '',
            cardNo: '',
            cardType: '',
            title: '2中国工商银行&nbsp;尾号3341',
            demandClassName: 'positive',
            demandDeposits: '结余&nbsp;&yen;10.00',
            totalClassName: 'vals',
            totalDeposits: '&yen;20.00'
        }]
    }
};
var debitCardListData = [{
    mediumId: "2418606430323712",
    organizationId: "1",
    bankName: "中国工商银行",
    mediumNo: "0429"
}, {
    mediumId: "2418606430323713",
    organizationId: "2",
    bankName: "中国农业银行",
    mediumNo: "0430"
}, {
    mediumId: "2418606430323714",
    organizationId: "3",
    bankName: "中国银行",
    mediumNo: "0431"
}, {
    mediumId: "2418606430323715",
    organizationId: "4",
    bankName: "中国建设银行",
    mediumNo: "0432"
}, {
    mediumId: "2418606430323716",
    organizationId: "5",
    bankName: "招商银行",
    mediumNo: "0433"
}, {
    mediumId: "2418606430323717",
    organizationId: "6",
    bankName: "交通银行",
    mediumNo: "0433"
}, {
    mediumId: "2418606430716928",
    organizationId: "7",
    bankName: "平安银行",
    mediumNo: "0439"
}];
var debitIncomePayData = {
    labelList: [{
        className: '',
        labelYear: '最近12个月',
        value: '0'
    }, {
        className: 'sled',
        labelYear: '2015',
        value: '1'
    }, {
        className: '',
        labelYear: '2014',
        value: '2'
    }],
    monthData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    incomeData: [0, 31000, 12500, 13000, 13500, 38000, 12500, 12000, 11000, 13800, 15000, 14000],
    expenditureData: [0, -25000, -7400, -7600, -7500, -21500, -16000, -7800, -7400, -10000, -6500, -9000],
    balance: [0, -2599, 4000, 2000, -4500, 11000, -11000, 2000, 2500, 3500, -16500, 2000]
};
//0 最近12个月； 1 本年；2 上年；
var creditBillingData = {
    labelList: [{
        className: 'sled',
        labelYear: '最近12个月',
        value: '0'
    }, {
        className: '',
        labelYear: '2015',
        value: '1'
    }, {
        className: '',
        labelYear: '2014',
        value: '2'
    }],
    seriesData: [{
        name: "购物百货",
        value: 12000
    }, {
        name: "服装箱包",
        value: 11000
    }, {
        name: "电器数码",
        value: 10000
    }, {
        name: "交通出行",
        value: 9000
    }, {
        name: "吃喝",
        value: 8000
    }, {
        name: "休闲娱乐",
        value: 7000
    }, {
        name: "医疗健康",
        value: 6000
    }, {
        name: "装饰装潢",
        value: 5000
    }, {
        name: "生活缴费",
        value: 4000
    }, {
        name: "其他消费",
        value: 3000
    }, {
        name: "房贷",
        value: 2000
    }, {
        name: "车贷",
        value: 1000
    }],
    totalBill: {
        years: '2014',
        months: 2,
        currency: '&yen;',
        price: '-4,000.00',
        totalBillList: [{
            isNotice: false,
            mediumId: "2418606430323712",
            organizationId: "1",
            bankName: "中国工商银行",
            mediumNo: "0429",
            currency: '&yen;',
            price: '-4,000.00'
        }, {
            isNotice: true,
            mediumId: "2418606430323713",
            organizationId: "2",
            bankName: "中国农业银行",
            mediumNo: "0430",
            currency: '&yen;',
            price: '-4,000.00'
        }, {
            isNotice: true,
            mediumId: "2418606430323714",
            organizationId: "3",
            bankName: "中国银行",
            mediumNo: "0431",
            currency: '&yen;',
            price: '-4,000.00'
        }, {
            isNotice: false,
            mediumId: "2418606430323715",
            organizationId: "4",
            bankName: "中国建设银行",
            mediumNo: "0432",
            currency: '&yen;',
            price: '-4,000.00'
        }, {
            isNotice: false,
            mediumId: "2418606430323716",
            organizationId: "5",
            bankName: "招商银行",
            mediumNo: "0433",
            currency: '&yen;',
            price: '-4,000.00'
        }, {
            isNotice: false,
            mediumId: "2418606430323717",
            organizationId: "6",
            bankName: "交通银行",
            mediumNo: "0433",
            currency: '&yen;',
            price: '-4,000.00'
        }, {
            isNotice: false,
            mediumId: "2418606430716928",
            organizationId: "7",
            bankName: "平安银行",
            mediumNo: "0439",
            currency: '&yen;',
            price: '-4,000.00'
        }]
    },
    monthPriceList: [{
        isFuture: false,
        years: '2014',
        months: '1',
        className: 'old negative first',
        currency: '&yen;',
        totalPrices: '-100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '2',
        className: 'even negative',
        currency: '&yen;',
        totalPrices: '-100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '3',
        className: 'old negative',
        currency: '&yen;',
        totalPrices: '-100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '4',
        className: 'even negative',
        currency: '&yen;',
        totalPrices: '-100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '5',
        className: 'old positive hover',
        currency: '结余&yen;',
        totalPrices: '100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '6',
        className: 'even negative',
        currency: '&yen;',
        totalPrices: '-100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '7',
        className: 'old',
        currency: '&yen;',
        totalPrices: '0.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2014',
        months: '8',
        className: 'even positive',
        currency: '结余&yen;',
        totalPrices: '100,334.00',
        traditional: '201401'
    }, {
        isFuture: false,
        years: '2015',
        months: '9',
        className: 'old' //如果是正常月，获取不到价格
    }, {
        isFuture: false,
        years: '2015',
        months: '10',
        className: 'even negative',
        currency: '&yen;',
        totalPrices: '-100,334.00',
        traditional: '201401'
    }, {
        isFuture: true, //代表是未来的月份
        years: '2015',
        months: '11',
        className: 'old future',
    }, {
        isFuture: true, //代表是未来的月份
        years: '2015',
        months: '12',
        className: 'even future last',
    }]
};
