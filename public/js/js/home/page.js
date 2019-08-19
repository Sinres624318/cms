function Page() {
    this.tabBar = $('.tab-list>li');
    this.content = $('.content');
}

Page.prototype = {
    init() {
        this.tabBarClick();
    },
    tabBarClick() {
        this.tabBar.on('click', this.handleTabClickCb.bind(this));
    },
    handleTabClickCb(event) {
        let e = event || window.event;
        let index = $(e.target).index();
        this.renderSwitch(index);
    },
    renderSwitch(index, a) {
        let beforeIndex = $('.tab-list .focus').index();
        $(this.tabBar[index]).addClass('focus').siblings().removeClass('focus');
        if (index == beforeIndex || a) return;
        switch (index) {
            case 0 :
                this.jobHomeRender();
                break;
            case 1 :
                this.jobListRender();
                break;
            case 2 :
                this.jobPublishRender();
                break;
        }

    },
    jobHomeRender() {
        new JobHome(this.content);
    },
    jobListRender() {
        new JobList(this.content);
    },
    jobPublishRender() {
        new JobPublish(this.content);
    }
};
let page = new Page();
page.init();
page.renderSwitch(0);