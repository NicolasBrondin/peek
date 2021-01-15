const puppeteer = require('puppeteer');

class ScreenshotManager {

    browser;
    page;

    constructor(){}

    async init(){
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async close(){
        await this.browser.close();
    }

    async generate(domain, urls, width, height, fullPage){
        
        await this.page.setViewport({ width, height });
        for(const url of urls){
            await this.page.goto(domain+url);
            await this.page.screenshot({path: './screenshots/'+(new Date()).getTime()+'.jpg', fullPage: fullPage});
        }
        
    }
}

module.exports = ScreenshotManager;