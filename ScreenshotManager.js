const puppeteer = require('puppeteer');

class ScreenshotManager {

    browser;
    page;
    onScreenshot;
onBeforePage;
onPage;
    constructor(){}

    async init(onLoaded, onScreenshot, onBeforePage, onPage){
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        this.onScreenshot = onScreenshot;
        this.onBeforePage = onBeforePage;
        this.onPage = onPage;
        if(onLoaded){
            onLoaded();
        }
    }

    async close(){
        await this.browser.close();
    }

    async generate(domain, urls, width, height, fullPage){
        
        await this.page.setViewport({ width, height });
        for(const url of urls){
            let path = './screenshots/'+(new Date()).getTime()+'.jpg';
            if(this.onBeforePage){
                this.onBeforePage(url);
            }
            await this.page.goto(domain+url);
            if(this.onPage){
                this.onPage(url);
            }
            await this.page.screenshot({path: path, fullPage: fullPage});
            if(this.onScreenshot){
                this.onScreenshot(path);
            }
        }
        
    }
}

module.exports = ScreenshotManager;