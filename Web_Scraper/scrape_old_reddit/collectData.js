async function collectData(page, endScraping = true){ 
        const data = await page.$$eval('div.top-matter', (cards, endScraping)=>{
                let postData = {
                    username: [],
                    title: [],
                    creationTime: [],
                    url: [],
                    flair: []
                };
                for(let i = 0; i < cards.length; i++){
                    let username = cards[i].querySelector('.tagline > a.author')?.innerText;
                    let title = cards[i].querySelector('p.title')?.innerText;
                    let creationTime = new Date (cards[i].querySelector('p.tagline > time')?.getAttribute('title'))?.getTime();
                    let url = cards[i].querySelector('p.title > a.title')?.getAttribute('href');
                    let flair = cards[i].querySelector('p.title > span.linkflairlabel');
                    flair = flair ? flair.innerText: null;
                    postData.username.push(username);
                    postData.title.push(title);
                    postData.creationTime.push(creationTime);
                    postData.url.push('https://old.reddit.com' + url);
                    postData.flair.push(flair);
                    if( endScraping[1] > creationTime){
                        endScraping[0] = false;
                        break;
                    }
                    
                }

                return [postData, endScraping[0]];
        }, endScraping);
        
        

    return data;  
}
module.exports = collectData;


