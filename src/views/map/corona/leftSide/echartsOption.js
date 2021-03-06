import chinaData from '@/static/china.json'
import foreignData from '@/static/foreign.json'

var colorPalette = ['#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
    '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
    '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
    '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6'
];
var romaTheme = {

    color: colorPalette,

    visualMap: {
        color: ['#e01f54', '#e7dbc3'],
        textStyle: {
            color: '#333'
        }
    },

    candlestick: {
        itemStyle: {
            normal: {
                color: '#e01f54',
                color0: '#001852',
                lineStyle: {
                    width: 1,
                    color: '#f5e8c8',
                    color0: '#b8d2c7'
                }
            }
        }
    },

    graph: {
        color: colorPalette
    },

    gauge: {
        axisLine: {
            lineStyle: {
                color: [
                    [0.2, '#E01F54'],
                    [0.8, '#b8d2c7'],
                    [1, '#001852']
                ],
                width: 8
            }
        }
    }
};

function getChinaData(var1 = chinaData) {
    let ChinaCurrentConfirmedCount = [];
    let ChinaSuspectedCount = [];
    let ChinaCuredCount = [];
    let ChinaDeadCount = [];
    let dates = [];
    for (let list of var1) {
        ChinaCurrentConfirmedCount.push(list.confirmed - list.cured - list.dead);
        ChinaSuspectedCount.push(list.suspected)
        ChinaCuredCount.push(list.cured)
        ChinaDeadCount.push(list.dead)
        dates.push(list.date)
    }
    return {
        ChinaCurrentConfirmedCount,
        ChinaSuspectedCount,
        ChinaCuredCount,
        ChinaDeadCount,
        dates
    }
}

function getForeignData() {
    let fDDates = [],
        FR = [],
        DE = [],
        JP = [],
        US = [],
        IT = [],
        GB = [],
        ES = [],
        RU = [];
    for (let element of foreignData) {
        if (element.countryCode == 'ES') {
            fDDates.push(element.date)
        }
    }
    for (let element of foreignData) {
        if (element.country == "??????") {
            FR.push(element.confirmed)
        } else if (element.country == '??????') {
            DE.push(element.confirmed)
        } else if (element.countryCode == 'JP') {
            JP.push(element.confirmed)
        } else if (element.countryCode == 'US') {
            US.push(element.confirmed)
        } else if (element.countryCode == 'IT') {
            IT.push(element.confirmed)
        } else if (element.countryCode == 'GB') {
            GB.push(element.confirmed)
        } else if (element.country == '?????????') {
            RU.push(element.confirmed)
        } else if (element.country == '?????????') {
            ES.push(element.confirmed)
        }
    }
    let length1 = ES.length
    for (let i = 0; i < fDDates.length - length1; i++) {
        FR.unshift(0)
    }
    length1 = DE.length
    for (let i = 0; i < fDDates.length - length1; i++) {
        DE.unshift(0)
    }
    length1 = JP.length
    for (let i = 0; i < fDDates.length - length1; i++) {
        JP.unshift(0)
    }
    length1 = US.length
    for (let i = 0; i < fDDates.length - length1; i++) {
        US.unshift(0)
    }
    length1 = IT.length
    for (let i = 0; i < fDDates.length - length1; i++) {
        IT.unshift(0)
    }
    length1 = GB.length
    for (let i = 0; i < fDDates.length - length1; i++) {
        GB.unshift(0)
    }
    return { fDDates, FR, DE, JP, US, IT, GB }
}
var chinaChartsOption = {
    title: {
        text: '',
        // textStyle: {
        //   color: '#FFFFFF',
        // }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            // label: {
            //   backgroundColor: '#000000'
            // }
        }
    },
    legend: {
        data: ['???????????????', '?????????', '?????????', '?????????'],
        top: '2%',
        left: '0'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        },
        // iconStyle: {
        //   color: '#FFFFFF',
        // }
    },
    grid: {
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
    },
    dataZoom: [{
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'inside',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
    ],
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: getChinaData().dates,
        axisLabel: {
            color: '',
            fontSize: 10,
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            color: '',
            fontSize: 10,
        }
    }],
    series: [{
            name: '?????????',
            type: 'line',
            stack: '??????',
            areaStyle: {},
            data: getChinaData().ChinaSuspectedCount,
        },
        {
            name: '?????????',
            type: 'line',
            stack: '??????',
            areaStyle: {},
            data: getChinaData().ChinaDeadCount,
        },
        {
            name: '?????????',
            type: 'line',
            stack: '??????',
            areaStyle: {},
            data: getChinaData().ChinaCuredCount,
        },
        {
            name: '???????????????',
            type: 'line',
            stack: '??????',
            areaStyle: {},
            label: {
                // normal: {
                //   show: true,
                //   position: ['-650%', '-290%'],
                //   color: '#E37272',
                //   fontWeight: 'bold',
                //   fontSize: '16',
                // }
            },
            data: getChinaData().ChinaCurrentConfirmedCount,
        },

    ],
    // color: ['#d48265', '#2f4554', '#61a0a8', '#c23531']
}
var foreignChartsOption = {
    title: {
        text: '',
        // textStyle: {
        //     color: '#FFFFFF',
        // },
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        },
        // iconStyle: {
        //     color: '#FFFFFF',
        // }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            // label: {
            //     backgroundColor: '#000000'
            // }
        },
    },
    legend: {
        top: '2%',
        left: '0px',
        data: ['??????', '??????', '??????', '??????', '?????????', '??????', ],
        // textStyle: {
        //     color: '#FFFFFF',
        // }
    },
    grid: {

        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
    },
    dataZoom: [{
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'inside',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
    ],
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: getForeignData().fDDates,
        axisLabel: {
            color: '',
            fontSize: 10,
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            color: '',
            fontSize: 10,
        }
    }],
    series: [{
            name: '??????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().JP,
        },
        {
            name: '??????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().FR,
        },
        {
            name: '?????????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().RU,
        },
        {
            name: '??????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().DE,
        },
        {
            name: '?????????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().ES,
        },
        {
            name: '??????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().GB,
        },
        {
            name: '?????????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().IT,
        },
        {
            name: '??????', // ????????????
            type: 'line', // ????????????
            data: getForeignData().US,
        },
    ]
};
export { chinaChartsOption, foreignChartsOption, romaTheme }