const cheerio = require("cheerio");
const request = require("request");

function getSingleMatch(link)
{
    request(link,cb);
}

function cb(error,response,body)
{
    parseData(body);
}

function parseData(html)
{
    let ch = cheerio.load(html);
    let allBatsmanInfoRows = ch('.table.batsman tbody tr');
    for(let i = 0;i<allBatsmanInfoRows.length/10;i++)
    {
         
    }
     
}

module.exports = getSingleMatch;
