import {JSDOM } from 'jsdom'

let baseURL = ''


 export async function parseHtml(url){
    const newURL = new URL(url);
    const response = await fetch(newURL);
    const data = await response.text();
    const dom = new JSDOM(data);
    const urls = dom.window.document.querySelectorAll('a')
    const anchors = []

    for (let url of urls) {
        if (url.hasAttribute('href')) {
            let href = url.getAttribute('href');
            try {
                href = new URL(href, baseURL).href
                anchors.push(href)
            } catch(err) {
                console.log(`${err.message}: ${href}`)
            }
        }

        console.log(anchors)
        return data;
        }
     }


export async function crawlPage(currentURL, pages) {



}


