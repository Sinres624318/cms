function Page() {
    this.container = $('.container');
}

Page.prototype = {
    init() {
        this.createContext();
    },
    createContext(judge) {
        if (!judge) {
            this.reg = new Reg(this.container);
        } else {
            this.login = new Login(this.container);
        }
    }
};
new Page().init();