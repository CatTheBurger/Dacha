var data3 = echarts.init(document.getElementById('data3')); 
data3_option = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['Temperature']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: false},
            dataZoom : {show: false},
            dataView : {show: false},
            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    dataZoom : {
        show : true,
        realtime : true,
        start : 20,
        end : 80
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : function (){
                var list = [];
                for (var i = 1; i <= 30; i++) {
                    list.push('2019-05-' + i);
                }
                return list;
            }()
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'Temperature',
            type:'line',
            data:function (){
                var list = [];

                var httpReq = new XMLHttpRequest();
                var json = `[
                  12.5,
                  13.3,
                  14.5,
                  13.5,
                  13.6,
                  13.9,
                  28.2,
                  18.4,
                  23.5,
                  10.5,
                  18.9,
                  17.3,
                  12.9,
                  12.5,
                  22.4
                ]`;

                httpReq.open("POST", '', true);
                httpReq.onreadystatechange = function(){
                    if (this.readyState == 4 && this.status == 200) {
                        json = this.responceText;
                    }
                };
                httpReq.send();

                var data = JSON.parse(json);

                for (var i = 1; i <= 30; i++) {             
                    var value = data[i];
                    if(value === undefined) value = 0;

                    list.push(value);
                }
                return list;
            }()
        }
    ]
};


// Load data into the ECharts instance 
data3.setOption(data3_option); 

var data3_spinner = echarts.init(document.getElementById('data3-spinner')); 

var spinner3_option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}℃"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    series : [
        {
            name:'',
            type:'gauge',
            detail : {formatter:'{value}℃'},
            data:[{value: 10,name:""}],
            max:30,
            min:-30,
            axisLine: {         
                lineStyle: {     
                    color: [[0.5, '#00bfff'],[0.75, '#fffa00'],[1.0, '#A00000']], 
                    width: 26
                }               
            }
        }
    ]
};



data3_spinner.setOption(spinner3_option);

function data3_spinnerUpdate(){
    //Ajax
    var httpReq = new XMLHttpRequest();
    var value = Math.floor(Math.random() * 50);

    httpReq.open("POST", '', true);
    httpReq.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            value = this.responceText;
        }
    };
    httpReq.send();

    spinner3_option.series[0].data[0].value = value;
    data3_spinner.setOption(spinner3_option);
}

setInterval(data3_spinnerUpdate, 3000);