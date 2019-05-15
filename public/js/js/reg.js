function Reg(container) {
    this.container = container;
    this.init();
}

Reg.template = `
    <div class="title">
        <img src="img/logo.png" alt="">
        <p class="tip"><span>使用手机号码注册</span></p>
    </div>
    <div class="form">
        <div class="form-group">
            <label for="exampleInputEmail1">用户名</label>
            <input type="text" class="form-control" id="userId" placeholder="请输入用户名">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">密码</label>
            <input type="password" class="form-control" id="password" placeholder="请输入密码">
        </div>
        <span id="login">立即登录</span>
        <button class="btn btn-primary">注册</button>
    </div>
`;

Reg.prototype = {
    init() {
        this.create();
        this.toggleSign();
        this.regClick();
    },
    create() {
        this.container.html('');
        this.container.append(Reg.template);
    },
    toggleSign() {
        this.container.find('#login').on('click', this.handleToggleSignCb.bind(this));
    },
    handleToggleSignCb() {
        new Page().createContext(true);
    },
    regClick() {
        this.container.find('.btn-primary').on('click', this.handleRegClickCb.bind(this));
    },
    handleRegClickCb() {
        let username = this.container.find('#userId').val();
        let password = this.container.find('#password').val();
        $.ajax({
            type: 'post',
            url: '/reg',
            data: {
                username,
                password
            },
            success: this.handleRegSuccess.bind(this)
        });
        console.log(username,password);
    },
    handleRegSuccess(data){
        console.log(data);
    }
};