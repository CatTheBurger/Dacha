var data4 = echarts.init(document.getElementById('data4')); 
data4_option = {
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
                  20.2,
                  18.4,
                  23.5,
                  10.5,
                  14.9,
                  17.3,
                  12.9,
                  19.5,
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
data4.setOption(data4_option); 

var data4_spinner = echarts.init(document.getElementById('data4-spinner')); 

var spinner4_option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c} Bar;"
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
            detail : {formatter:'{value} Bar'},
            data:[{value: 1,name:""}],
            max:4,min:0,
            axisLine: {         
                lineStyle: {     
                    color: [[0.25, '#fffa00'],[0.6, '#007b00'],[1.0, '#A00000']], 
                    width: 26
                }               
            }
        }
    ]
};



data4_spinner.setOption(spinner4_option);

function data4_spinnerUpdate(){
    //Ajax
    var httpReq = new XMLHttpRequest();
    var value = Math.floor(Math.random() * 4);

    httpReq.open("POST", '', true);
    httpReq.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            value = this.responceText;
        }
    };
    httpReq.send();

    spinner4_option.series[0].data[0].value = value;
    data4_spinner.setOption(spinner4_option);
}

setInterval(data4_spinnerUpdate, 3000);