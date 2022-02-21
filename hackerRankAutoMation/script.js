const puppeteer = require("puppeteer");
let challanges = require("./challanges");
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
    await tab.waitForSelector('.btn.btn-green.backbone.pull-right');
    let createChallnageButton = await tab.$('.btn.btn-green.backbone.pull-right');
    let createChallangeLink = await tab.evaluate(function(elem){
        return elem.getAttribute("href");
    },createChallnageButton); 
    createChallangeLink = "https://www.hackerrank.com"+createChallangeLink;
    //console.log(createChallangeLink);
    for(let i = 0;i<challanges.length;i++)
    {
        console.log(challanges[i]);
        addChallange(challanges[i],createChallangeLink,browser);
      await tab.waitForTimeout(3500);
    }
})();

async function addChallange(challange , createLink , browser)
{
    let challangeName = challange["Challenge Name"];
    let description = challange["Description"];
    let problemStatement = challange["Problem Statement"];
    let constraints = challange["Constraints"];
    let outputFormat = challange["Output Format"];
    let inputFormat = challange["Input Format"];
    let tags = challange["Tags"];

    let newTab = await browser.newPage();
    await newTab.goto(createLink);
    await newTab.waitForSelector("#name",{visible:true});
    await newTab.type("#name",challangeName);
    await newTab.type("#preview", description);
    await newTab.type("#problem_statement-container .CodeMirror textarea",problemStatement);
    await newTab.type("#constraints-container .CodeMirror  textarea",constraints);
    await newTab.type("#input_format-container .CodeMirror textarea",inputFormat);
    await newTab.type("#output_format-container .CodeMirror textarea",outputFormat);
    await newTab.type("#tags_tag",tags); 
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn");
    await newTab.waitForTimeout(2000);
    await newTab.close();
}
