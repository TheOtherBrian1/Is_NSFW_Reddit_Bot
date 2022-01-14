const puppeteer = require('puppeteer');
const collectData = require('./collectData');
const fs = require('fs');
const importantData = {
    submissionText: [],
    authorFullID: [],
    gilded: [],
    title: [],
    linkFlairCSS: [],
    name: [],
    upvoteRatio: [],
    totalAwardsReceived: [],
    userReports: [],
    linkFlairText: [],
    score: [],
    reportReasons: [],
    url: [],
    created: [],
    comment_num: [],
    author: []
}
const crawler = async (link)=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(link);
    await page.content();
    try{


        let next_link;
        let time = 1;
        
        do{
            let pageJson = await page.evaluate(()=>{
                return JSON.parse(document.querySelector('body').innerText);
            })
            for(let submissionData of pageJson.data.children){
                importantData.submissionText.push(submissionData.data.selftext || null);
                importantData.authorFullID.push(submissionData.data.author_fullname || null);
                importantData.gilded.push(submissionData.data.gilded || null);
                importantData.title.push(submissionData.data.title || null);
                importantData.linkFlairCSS.push(submissionData.data.link_flair_css_class || null);
                importantData.name.push(submissionData.data.name || null);
                importantData.upvoteRatio.push(submissionData.data.upvote_ratio || null);
                importantData.totalAwardsReceived.push(submissionData.data.total_awards_received || null);
                importantData.userReports.push(submissionData.data.user_reports || null);
                importantData.linkFlairText.push(submissionData.data.link_flair_text || null);
                importantData.score.push(submissionData.data.score || null);
                importantData.reportReasons.push(submissionData.data.report_reasons || null);
                importantData.url.push(submissionData.data.url || null);
                importantData.created.push(submissionData.data.created_utc || null);
                importantData.comment_num.push(submissionData.data.num_comments || null);
                importantData.author.push(submissionData.data.author || null);
            }
            //console.log(importantData);
            page.waitForTimeout(1000);
            next_link = 'https://www.reddit.com/r/cuddlebuddies/new.json' + `?after=${pageJson.data.after}`;
            time = pageJson.data.after;
            const d = new Date(importantData.created[importantData.created.length - 1]*1000);
            
            console.log(time, d);
            await page.goto(next_link);
            await page.content();
        } while(time != null)
        fs.writeFile('redditData.json', JSON.stringify(importantData), (err)=>{
            if (err) console.log('an error occured while saving', err);
            else console.log('data saved');
        });
        page.close();
        browser.close();
    }
    catch(err){
        console.log('an error occured\n', err);
        await page.close();
        await browser.close();
    }
}
crawler('https://www.reddit.com/r/cuddlebuddies/new.json')








        /*await page.setRequestInterception(true);
        page.on('request', request => {
            console.log('>>',request.method(), request.headers()['content-type']);
            if (request.headers()['content-type'] === 'application/json'){
                console.log('duck');
            }
        });
        
        page.on('response', response => {
            console.log(response.status(), response.url(), response.headers()['content-type'] )
        })
        /*
        for(let i = 0; i < 1000; i++){
            await page.keyboard.press('Space')
            await page.waitForTimeout(Math.random()* 1000 + 100);
            console.log('press');
        }
        */
        /*
        fs.writeFile('redditData.json', JSON.stringify(submissions), (err)=>{
            if (err) console.log('an error occured while saving', err);
            else console.log('data saved');
        });
        */