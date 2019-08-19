function JobList(container, select) {
    this.container = container;
    this.select = select;
    this.init();
}

JobList.template = `
    <div class="jobList clearFix"></div>
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" id="jobModel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel">招聘信息修改</h4>
          </div>
          <div class="modal-body">
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
                </div>
            </div>
          </div>
          <div class="modal-fo oter">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" id="modalSave">保存修改</button>
          </div>
        </div>
      </div>
    </div>
`;

JobList.prototype = {
    init() {
        if (!this.select) {
            this.create();
        }
    },
    create() {
        $.ajax({
            type: 'get',
            url: '/job/selectJob',
            success: this.handleCreateCb.bind(this)
        });
    },
    handleCreateCb(data) {
        this.container.html(JobList.template);
        for (let i = 0; i < data.data.length; i++) {
            let wordCut = '';
            let industry = '';
            let mainWordArr = data.data[i].mainWork.split(';');
            let industryArr = data.data[i].positionTechnology.split(';');
            for (let j = 0; j < mainWordArr.length; j++) {
                industry += '<span>' + mainWordArr[j] + '</span>'
            }
            for (let j = 0; j < industryArr.length; j++) {
                wordCut += '<span class="wordCut">' + industryArr[j] + '</span>';
            }
            let item = `
                <div class="jobItem" data-id="${data.data[i]._id}">
                    <div class="jobItem-top">
                        <div class="jobItem-top-title clearFix">
                            <div class="position-name">
                                <h2 class="position-name-text">${data.data[i].positionName}</h2>
                                <span class="create-time">[${data.data[i].publishDate}发布]</span>
                            </div>
                            <span class="salary">${data.data[i].positionSalary}</span>
                        </div>
                        <div class="jobItem-top-info">
                            <span class="experience">${data.data[i].positionClaim}</span>
                            <span>/</span>
                            <span class="edu">${data.data[i].eduClaim}</span>
                        </div>
                        <div class="wordCut-operation clearFix">
                            <div class="wordCut-wrap">${wordCut}</div>
                            <div class="operation">
                                <button class="delete btn-danger">删除</button>
                                <button class="modify btn-primary" data-toggle="modal" data-target="#jobModel">修改</button>
                            </div>
                        </div>
                    </div>
                    <div class="jobItem-bottom clearFix">
                        <a href="" class="copyright-logo">
                            <img src="${data.data[i].companyLogo}" alt="">
                        </a>
                        <div class="bottom-right">
                            <div class="company_name">${data.data[i].companyName}</div>
                            <div class="industry">${industry}</div>
                        </div>
                    </div>
                </div>
            `;
            this.container.find('.jobList').append(item);
        }
        this.del();
        this.updateData();
        this.updateSave();
    },
    del() {
        $('.delete').on('click', this.handleDeleteClickCb.bind(this));
    },
    handleDeleteClickCb(event) {
        let e = event || window.event;
        if (confirm('确定要删除该条数据！')) {
            let _id = $(e.target).parent().parent().parent().parent().attr('data-id');
            $.ajax({
                type: 'get',
                url: 'job/deleteJob',
                data: {
                    _id
                },
                success: this.handleDeleteCb.bind(this)
            });
        }
    },
    handleDeleteCb(data) {
        if (data.state) {
            alert(data.info);
            this.create();
        }
    },
    updateData() {
        $('.modify').on('click', this.handleUpdateDataCb.bind(this));
    },
    handleUpdateDataCb(event) {
        let e = event || window.event;
        let item = $(e.target.parentNode.parentNode.parentNode.parentNode);
        let companyName = item.find('.company_name').text();
        let positionClaim = item.find('.experience').text();
        let positionName = item.find('.position-name-text').text();
        let eduClaim = item.find('.edu').text();
        let positionSalary = item.find('.salary').text();
        let mainWork = this.joinData(item.find('.industry>span'));
        let positionTechnology = this.joinData(item.find('.wordCut'));
        let _id = item.attr('data-id');

        $('#companyName').val(companyName);
        $('#positionClaim').val(positionClaim);
        $('#mainWork').val(mainWork);
        $('#positionName').val(positionName);
        $('#eduClaim').val(eduClaim);
        $('#positionSalary').val(positionSalary);
        $('#positionTechnology').val(positionTechnology);
        $('.modal-content').attr('_id', _id);
    },
    joinData($arr) {
        let resultStr = '';
        for (let i = 0; i < $arr.length; i++) {
            if ($arr.length - 1 != i) {
                resultStr += $($arr[i]).text() + ';';
            } else {
                resultStr += $($arr[i]).text();
            }
        }
        return resultStr;
    },
    updateSave() {
        $('#modalSave').on('click', this.handleUpdateSaveCb.bind(this));
    },
    handleUpdateSaveCb() {
        let companyName = $('#companyName').val();
        let positionClaim = $('#positionClaim').val();
        let mainWork = $('#mainWork').val();
        let positionName = $('#positionName').val();
        let eduClaim = $('#eduClaim').val();
        let positionSalary = $('#positionSalary').val();
        let positionTechnology = $('#positionTechnology').val();
        let _id = $('.modal-content').attr('_id');
        let companyLogo = document.getElementById('companyLogo').files[0];
        console.log(_id);
        let data = new FormData();
        data.append('companyName', companyName);
        data.append('positionName', positionName);
        data.append('eduClaim', eduClaim);
        data.append('positionSalary', positionSalary);
        data.append('positionTechnology', positionTechnology);
        data.append('companyLogo', companyLogo);
        data.append('positionClaim', positionClaim);
        data.append('mainWork', mainWork);
        data.append('_id', _id);
        $.ajax({
            type: 'post',
            url: '/job/updateJob',
            data,
            cache: false,//不读取缓存中的结果 true的话会读缓存  其实post本身就不会读取缓存中的结构
            processData: false,//默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
            contentType: false,//数据编码格式不使用jquery的方式 为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
            success: this.handleUpdateJobCb.bind(this)
        });
    },
    handleUpdateJobCb(data) {
        if (data.state) {
            alert(data.info);
            $('.modal-backdrop').remove();
            this.create();
        }
    }
};
