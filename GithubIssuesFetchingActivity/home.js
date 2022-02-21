const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");

let baseUrl = "https://github.com/topics";

request(baseUrl , function(error, response, data)
{
    //try to get all Topics
    let ch = cheerio.load(data);
    let topic_aTags = ch('li.col-12.col-sm-6.col-md-4.mb-4 a');
    for(let i = 0;i<topic_aTags.length;i++)
    {
        let topicAddress = ch(topic_aTags[i]).attr('href');
        let topicName = topicAddress.split("/");
        topicName = topicName[topicName.length-1];
        topicAddress = "https://www.github.com"+topicAddress;
        console.log(topicName);
        //console.log(topicAddress);
        if(!fs.existsSync(topicName))
        {
            fs.mkdirSync(topicName);
        }
        getAllIssuesOfaTopic(topicName,topicAddress);
    }
    
});

function getAllIssuesOfaTopic(topicName , link)
{
    request(link,function(error, response ,data)
    {
        let ch = cheerio.load(data);
        let top5Repo_aTags = ch('article a.text-bold');
        //console.log(top5Repo_aTags+"");
        for(let i = 0;i<5;i++)
        {
            let repoAddress = ch(top5Repo_aTags[i]).attr('href');
            let repoName = repoAddress.split("/");
            repoName = repoName[repoName.length-1];
            //console.log(repoAddress);
            let repoForATopicAddress = topicName+`/${repoName}`;
            //console.log(repoForATopicAddress);
            if(!fs.existsSync(repoForATopicAddress))
            {
                fs.mkdirSync(repoForATopicAddress);
            }
            let IssuesInARepo_aTags = ch('nav a[data-ga-click="Explore, go to repository issues, location:explore feed"]');
            for(let i = 0;i<IssuesInARepo_aTags.length;i++)
            {
                let issuesLink = ch(IssuesInARepo_aTags[i]).attr('href');
               // console.log(issuesLink);
                issuesLink = "https://www.github.com"+issuesLink;
                //console.log(issuesLink);
                request(issuesLink,function(error,response,data)
                {
                    let ch = cheerio.load(data+"");
                    let issues_All_aTags = ch('div[aria-label="Issues"] a[data-hovercard-type="issue"]');
                    //console.log(issues_All_aTags+"");
                    for(let i = 0;i<issues_All_aTags.length;i++)
                    {
                        let issueName = ch(issues_All_aTags[i]).text().trim();
                        let issueLink = ch(issues_All_aTags[i]).attr('href');
                        issueLink = `https://www.github.com${issueLink}`;
                        //console.log("Topic Name :" , topicName);
                        //console.log("Issue Name : ",issueName);
                        let newIssue = {
                            "IssueName" : issueName,
                            "IssueLink" : issueLink
                        };
                        if(!fs.existsSync(`${topicName}/${repoName}/issues.json`))
                        {
                            fs.writeFileSync(`${topicName}/${repoName}/issues.json`,JSON.stringify([]));
                        }
                        else
                        {
                            let issues = JSON.parse(fs.readFileSync(`${topicName}/${repoName}/issues.json`));
                            issues.push(newIssue);
                            fs.writeFileSync(`${topicName}/${repoName}/issues.json`,JSON.stringify(issues));
                        }
                    }
                });
            }
        }
    });
}