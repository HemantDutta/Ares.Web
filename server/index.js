const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 5000;

app.listen(port, ()=>{
    console.log("Server is listening on port: ", port);
});

app.get("/", (req,res)=>{
   res.send(`<h1>Ares.Web Server</h1>`);
});

app.get("/test-scraping", async (req,res)=>{
    const url = "https://www.theverge.com/search?q=React";
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    const titleData = await page.evaluate(()=>{
        const titles = Array.from(document.querySelectorAll(".max-w-content-block-standard"));
        const data = titles.map((news)=>({
            title: news.querySelector("h2 a").innerText
        }))
        return data;
    })

    console.log(titleData);

    await browser.close();
});