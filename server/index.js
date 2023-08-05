const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());

app.listen(port, ()=>{
    console.log("Server is listening on port: ", port);
});

app.get("/", (req,res)=>{
   res.send(`<h1>Ares.Web Server</h1>`);
});

app.get("/test-scraping", async (req,res)=>{
    let userSearch = req.query.search;
    let temp_words = userSearch.split(" ");
    userSearch = temp_words[0];
    for(let i = 1;i<temp_words.length;i++)
    {
        userSearch+="%20";
        userSearch+=temp_words[i];
    }
    const url = `https://www.theverge.com/search?q=${userSearch}`;
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await autoScroll(page,50)
    const titleData = await page.evaluate(()=>{
        const titles = Array.from(document.querySelectorAll(".max-w-container-md"));
        return titles.map((news) => ({
            title: news.querySelector("h2 a").innerText.substring(0,66)+"...",
            link: "https://www.theverge.com/"+news.querySelector("h2 a").getAttribute("href"),
            desc: news.querySelector(".duet--article--dangerously-set-cms-markup").innerText.substring(0,122)+"...",
            imgSrc: news.querySelector("div.aspect-square a span img").getAttribute("src"),
            from: "The Verge",
            color: "verge"
        }));
    })
    res.send(titleData);
    await browser.close();

});

//Scroll Entire Page to avoid lazy loading images
async function autoScroll(page, maxScrolls){
    await page.evaluate(async (maxScrolls) => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let scrolls = 0;  // scrolls counter
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                scrolls++;
                if(totalHeight >= scrollHeight - window.innerHeight || scrolls >= maxScrolls){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    }, maxScrolls);
}