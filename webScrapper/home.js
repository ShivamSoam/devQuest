const cheerio = require("cheerio");
const request = require("request");
const getAllMatches = require("./allMatches");

let url = "https://www.espncricinfo.com/series/ipl-2021-1249214";

request(url , cb);

function cb(error , response , body)
{
    parseData(body);
}

function parseData(html)
{
    let ch = cheerio.load(html);
    let aTag= ch('a[data-hover = "View All Results"]');
    console.log(aTag+"");
    let aTagHref = aTag['0']["attribs"]["href"];
    console.log(aTagHref);
    let allMatchResultsPageLink = "https://www.cricinfo.com"+aTagHref;
    getAllMatches(allMatchResultsPageLink);
    console.log(allMatchResultsPageLink);
}