const cheerio = require("cheerio");
const request = require("request");
const getSingleMatch = require("./match");

function getAllMatches(link)
{
    request(link,cb);
    function cb(error ,response, body)
    {
        parseData(body);
    }
}

function parseData(html)
{
    let ch = cheerio.load(html);
    let allATags = ch('.match-score-block .match-info-link-FIXTURES');
    //console.log(allATags.length);
    for(let i = 0;i<allATags.length;i+=4)//Don't know why but it is giving  same tag for like 4 times , so to get uniques values I'm incrementing it by 4
    {
        
        let aTag = ch(allATags[i]);
        let aTagHref = aTag['0']["attribs"]["href"];
        let SingleMatchLink = "https://www.espncricinfo.com"+aTagHref;
        //console.log(SingleMatchLink);
        getSingleMatch(SingleMatchLink);
    }
}

module.exports = getAllMatches;