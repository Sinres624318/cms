function Login(conatiner) {
    this.container = conatiner;
    this.init();
}

Login.template = `
    <div class="title">
        <img src="img/logo.png" alt="">
        <p class="tip"><span>使用用户名登录</span></p>
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
        <span id="reg">立即注册</span>
        <button class="btn btn-primary">登录</button>
    </div>
`;
Login.prototype = {
    init() {
        this.create();
        this.toggleSign();
        this.loginClick();
    },
    create() {
        this.container.html('');
        this.container.html(Login.template);
    },
    toggleSign() {
        this.container.find('#reg').on('click', this.handleToggleSignCb.bind(this));
    },
    handleToggleSignCb() {
        new Page().createContext();
    },
    loginClick() {
        this.container.find('.btn-primary').on('click', this.handleLoginClickCb.bind(this));
    },
    handleLoginClickCb() {
        let username = this.container.find('#userId').val();
        let password = this.container.find('#password').val();
        $.ajax({
            type: 'post',
            url: '/login',
            data: {
                username,
                password
            },
            success: this.handleLoginSuccessCb.bind(this)
        });
    },
    handleLoginSuccessCb(data) {
        if(data.state){
            alert('登录成功');
            location.href = 'http://localhost:3000/home.html';
        }else {
            alert('登录失败')
        }
    }
};