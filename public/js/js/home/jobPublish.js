function JobPublish(container) {
    this.container = container;
    this.init();
}

JobPublish.template = `
    <div class="publishJob-wrap">
        <div class="publishJob">
            <div class="form">
              <div class="form-group">
                <label for="companyName">公司名称</label>
                <input type="text" class="form-control" id="companyName" placeholder="公司名称">
              </div>
              <div class="form-group">
                <label for="mainWork">公司主要业务</label>
                <input type="text" class="form-control" id="mainWork">
              </div>
              <div class="form-group clearFix">
                    <div class="form-group-right">
                        <label for="positionClaim">职位要求</label>
                        <textarea placeholder="请输入职位要求" name="" id="positionClaim" class="form-control"></textarea>
                    </div>
                    <div class="form-group-left">
                        <label for="positionName">职位名称</label>
                        <input type="text" class="form-control" id="positionName" placeholder="请输入职位名称">
                    </div>
                    <div class="form-group-left">
                        <label for="eduClaim">学历要求</label>
                        <input type="text" class="form-control" id="eduClaim" placeholder="要求">
                    </div>
                    <div class="form-group-left">
                      <label for="positionSalary">薪资</label>
                      <input type="text" class="form-control" id="positionSalary" placeholder="薪资范围">
                    </div>
              </div>
              <div class="form-group">
                <label for="positionTechnology">职位相关技术</label>
                <input type="text" class="form-control" id="positionTechnology" placeholder="请输入职位相关技术">
              </div>
              <div class="form-group">
                <label for="companyLogo">公司Logo</label>
                <input type="file" id="companyLogo">
              </div>
              <button type="button" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
`;

JobPublish.prototype = {
    init() {
        this.create();
        this.submitSave();
    },
    create() {
        this.container.html(JobPublish.template);
    },
    submitSave() {
        $('.btn-primary').on('click', this.submitSaveCb.bind(this))
    },
    submitSaveCb() {
        let companyName = $('#companyName').val();
        let positionClaim = $('#positionClaim').val();
        let mainWork = $('#mainWork').val();
        let positionName = $('#positionName').val();
        let eduClaim = $('#eduClaim').val();
        let positionSalary = $('#positionSalary').val();
        let positionTechnology = $('#positionTechnology').val();
        let companyLogo = document.getElementById('companyLogo').files[0];

        let data = new FormData();
        data.append('companyName',companyName);
        data.append('positionName',positionName);
        data.append('eduClaim',eduClaim);
        data.append('positionSalary',positionSalary);
        data.append('positionTechnology',positionTechnology);
        data.append('companyLogo',companyLogo);
        data.append('positionClaim',positionClaim);
        data.append('mainWork',mainWork);
        $.ajax({
            type:'post',
            url:'/job/addJob',
            data,
            cache: false,//不读取缓存中的结果 true的话会读缓存  其实post本身就不会读取缓存中的结构
            processData: false,//默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
            contentType: false,//数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
            success:this.handleAddJobCb.bind(this)
        });
    },
    handleAddJobCb(data){
        if(data.state){
            alert('添加成功');
            new Page().renderSwitch(1);
        }else {
            alert('添加失败')
        }
    }
};