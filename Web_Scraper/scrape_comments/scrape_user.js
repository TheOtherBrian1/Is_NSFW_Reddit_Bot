const puppeteer = require('puppeteer');
const fs = require('fs');
let relevantRedditUsers = require("./relevantRedditUsers");
let relevantUsers = [];
for(aUser of relevantRedditUsers)
    if(aUser !== '[deleted]') relevantUsers.push(aUser);
const scrapeUser = async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const user = {
        submissions: {
            subreddit: [],
            selftext: [],
            author_fullname: [],
            title: [],
            upvote_ratio: [],
            ups: [],
            total_awards_received: [],
            score: [],
            created: [],
            subreddit_id: [],
            id: [],
            author: [],
            num_comments: [],
            url: [],
            created_utc: []
        },
        comments: {
            subreddit_id: [],
            comment_type: [],
            link_title: [],
            ups: [],
            total_awards_received: [],
            subreddit: [],
            link_author: [],
            replies: [],
            gilded: [],
            author: [],
            num_comments: [],
            score: [],
            author_fullname: [],
            body: [],
            edited: [],
            is_submitter: [],
            link_id: [],
            link_permalink: [],
            created: [],
            created_utc: [],
            link_url: []
        }
    };
    


    const submissionArray = [];
    const commentArray = [];
    function sub(jsonData){
        let mistakes_were_made = {};
        for(let regret in user.submissions)
            mistakes_were_made[regret] = jsonData[regret] || null;
        return mistakes_were_made;
    }
    function com(jsonData){
        let mistakes_were_made = {};
        for(let regret in user.comments)
            mistakes_were_made[regret] = jsonData[regret] || null;
        return mistakes_were_made;
    }

    let cycle = 1;
    try{
        for(let username of relevantUsers){
            const baseLink = 'https://www.reddit.com/user/';
            const userLink = `${baseLink}${username}.json`
            await page.goto(userLink);
            await page.content();
            let after = 1;
            console.log(username, cycle++);
            for(let i = 0; i < 4 && after; i++){
                let pageJson = await page.evaluate(()=>{
                    return JSON.parse(document.querySelector('body').innerText);
                })
                
                after = pageJson.data?.after;
                if(typeof after === 'undefined'){
                    console.log('account corrupted', pageJson)
                    break;
                }
                console.log(after, 'after');
                for(let card of pageJson.data.children){
                    card = card.data;
                    if ('comment_type' in card){
                        commentArray.push(com(card));
                    }
                    else{
                        submissionArray.push(sub(card));
                    }
                }
                //await page.waitForTimeout(300);
                await page.goto(userLink + `?after=${after}`);
                await page.content();
            }
        }
        const comments = commentArray.map(JSON.stringify).join('\n');
        const submissions = submissionArray.map(JSON.stringify).join('\n');
        console.log(comments);
        console.log(user.comments);
        fs.writeFile('reddit_userData_comments.json', comments, (err)=>{
            if (err) console.log('an error occured while saving', err);
            else console.log('data saved');
        });
        fs.writeFile('reddit_userData_submissions.json', submissions, (err)=>{
            if (err) console.log('an error occured while saving', err);
            else console.log('data saved');
        });
        
        await page.close();
        await browser.close();
    }
    catch(err){
        console.log('an error occured\n', err);
        await page.close();
        await browser.close();
    }
}

scrapeUser();