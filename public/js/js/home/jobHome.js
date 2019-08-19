function JobHome(container) {
    this.container = container;
    this.init();
}

JobHome.template = `
    <div class="jobHome">
        <div id="main"></div>
    </div>
`;
JobHome.prototype = {
    init() {
        this.create();
    },
    create() {
        $.ajax({
            type: 'get',
            url: '/job/selectJob',
            success: this.handleSuccessCb.bind(this)
        });
    },
    handleSuccessCb(data) {
        let arr = [];
        for (let i = 0; i < data.data.length; i++) {
            let a = true;
            for (let j = 0; j < arr.length; j++) {
                if (data.data[i].positionName == arr[j].name) {
                    arr[j].value++;
                    a = false;
                    break;
                }
            }
            if (a) {
                arr.push({value: 1, name: data.data[i].positionName});
            }
        }
        let dataStr = JSON.stringify(arr);
        let nameArr = [];
        for (let i = 0; i < arr.length; i++) {
            nameArr.push(arr[i].name);
        }
        let nameStr = JSON.stringify(nameArr);
        let str = `
            <script type="text/javascript">
                var myChart = echarts.init(document.getElementById('main'));
                option = {
                    title : {
                        text: '职位需求',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ${nameStr}
                    },
                    series : [
                        {
                            name: '职位需求',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:${dataStr},
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            </script>
        `;
        this.container.html(JobHome.template);
        this.container.append(str);
        this.selectJob();
    },
    selectJob() {
        myChart.on('click', (params) => {
            let positionName = params.data.name;
            console.log(positionName);
            $.ajax({
                type: 'get',
                url: 'job/selectJob',
                data: {positionName},
                success: this.selectJobCb.bind(this)
            });
        });
    },
    selectJobCb(data) {
        console.log(data);
        let jobList = new JobList(this.container, true);
        page.renderSwitch(1, true);
        jobList.handleCreateCb(data);
    }
};
new JobHome($('.content'));