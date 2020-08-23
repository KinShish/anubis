const Joi = require('@hapi/joi');
//База*****временно
const arrayPostRequest=[];

const cash=(n)=>{
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
//*********Парсер
const Apify = require('apify');
getTextInPage=(page,selector)=>{
    return page.evaluate((sel) => {
        if(document.querySelectorAll(sel)) {
            const result=[]
            document.querySelectorAll(sel).forEach(ti=>{
                result.push(ti.textContent)
            });
            return result;
        }
        return null;
    }, selector);
};
Apify.main(async () => {
    await new Apify.AutoscaledPool({
        maxConcurrency: 1,
        runTaskFunction: async () => {
            await Apify.utils.sleep(5000);
        },
        isTaskReadyFunction: async () => {
            return true
        },
        isFinishedFunction: async () => {
            return false
        },
    }).run();
});
const parseUrl=async (url,cash)=>{
    status = false;
    const requestQueue = await Apify.openRequestQueue('insta'+Date.now());
    await requestQueue.addRequest({ url: url });
    const crawler = new Apify.PuppeteerCrawler({
        launchPuppeteerOptions: {
            headless: true,
        },
        requestQueue,
        handlePageFunction: async ({ request, page }) => {
            const title = await page.title();
            const link=request.url;
            console.log(`Title of ${link}: ${title}`);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            await page.click("#react-root > section > main > div > div > article > div > div > ul > li > div > button");
            await Apify.utils.sleep(500);
            const comments=await getTextInPage(page,"#react-root > section > main > div > div > article > div.eo2As > div.EtaWk > ul > ul > div > li > div > div > div.C4VMK > span")
            arrayPostRequest.push({comments,cash});

        },
        maxRequestsPerCrawl: 50,
        maxConcurrency: 1,
    });
    await crawler.run()
}

exports.plugin = {
    name:'parser',
    version:'0.0.1',
    register: async (server)=>{
        /*
            TODO BoB; Запрос на работу парсера
         */
        server.route({
            method: 'POST',
            path: '/parser',
            config:{
                async handler(req,res) {
                    try {
                        const c=cash(20);
                        await parseUrl('https://www.instagram.com/p/CCs4oXSqq5V/',c);
                        const searchArray=()=>{
                            for(let a of arrayPostRequest){
                                if(a.cash===c){
                                    return a.comments;
                                }
                            }
                            return searchArray();
                        }
                        return searchArray();
                    }catch (e){
                        console.log(e)
                        return {err:true}
                    }
                },
                description: 'Тестовый анализ взятой публикации c инстограмма по тематике web',
                tags: ['api']
            }
        });
    }
};
