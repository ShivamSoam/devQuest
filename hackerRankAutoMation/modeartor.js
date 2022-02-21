const puppeteer = require("puppeteer");
let id = "xifov12632@aramidth.com";
let pass = "123456789";
//console.log(challanges);
let tab;
(async function(){
    let browser = await puppeteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"],slowMo:25});
    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2" , pass);
    await tab.click('button[type="submit"]'); 
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]');
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav li');
    let both_Li = await tab.$$('.nav-tabs.nav li');
    tab.waitForTimeout(1000);
    await both_Li[1].click();
    await addModeratorOnOnePage();
    let allPageNavButton = await tab.waitForSelector(".pagination li");
    let nextPageButton = allPageNavButton[allPageNavButton.length-2];
    let flag = await tab.evaluate(function(elem){
        return elem.classList.contains("active");
    },nextPageButton);
})();

async function addModeratorOnOnePage(){
    let allQuestsAtags = await tab.$$(".backbone.block-center");
    for(let i = 0;i<allQuestsAtags.length;i++)
    {
        
    }
}
