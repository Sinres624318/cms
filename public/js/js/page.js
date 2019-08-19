function Page() {
    this.container = $('.container');
}

Page.prototype = {
    init() {
        this.createContext();
    },
    createContext(judge) {
        if (!judge) {
            this.login = new Login(this.container);
        } else {
            this.reg = new Reg(this.container);
        }
    }
};
new Page().init();