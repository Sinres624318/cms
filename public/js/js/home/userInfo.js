function UserInfo() {
    this.username = $('.username');
    this.logout = $('.logout');
    this.init();
}

UserInfo.prototype = {
    init() {
        this.readUsername();
        this.logoutClick();
    },
    readUsername() {
        if (Cookies.get('user')) {
            this.username.text(Cookies.get('user'));
        }
    },
    logoutClick() {
        this.logout.on('click', this.logoutCb.bind(this));
    },
    logoutCb() {
        if (confirm('确定退出！')) {
            Cookies.remove('user');
            Cookies.remove('token');
            if (!Cookies.get('token')) {
                location.href = 'http://localhost:3000/index.html';
            }
        }
    }
};

new UserInfo();