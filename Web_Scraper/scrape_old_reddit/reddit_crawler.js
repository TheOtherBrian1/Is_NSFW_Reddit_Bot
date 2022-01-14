const puppeteer = require('puppeteer');
const collectData = require('./collectData');
const fs = require('fs');
const endScraping = [true, 0];

const crawler = async (link)=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(link);

    await page.screenshot({path: './delete.png'});
    try{
        let submissions = [];
        await page.waitForSelector('span.next-button > a');
        const firstScrape = await collectData(page, endScraping);
        submissions = submissions.concat(firstScrape[0].flair);
        endScraping[1] = firstScrape[0].creationTime[0] - 15895265000;
        
        await page.click('span.next-button > a');
        await page.waitForSelector('span.next-button > a');
        console.log(endScraping[0]);
        while(endScraping[0]){
            console.log('looped');
            const [sessionData, shouldContinue] = await collectData(page, endScraping);
            endScraping[0] = shouldContinue;
            submissions = submissions.concat(sessionData['flair']);
            await page.click('span.next-button > a');
            await page.waitForSelector('span.next-button > a');
        }

        fs.writeFile('redditData.json', JSON.stringify(submissions), (err)=>{
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
crawler('https://old.reddit.com/r/cuddlebuddies/new/')