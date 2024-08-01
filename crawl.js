import {JSDOM } from 'jsdom'

let baseURL = new URL('https://www.google.com')




function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

export async function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');

    for(let anchor of anchors){
        if(anchor.hasAttribute('href')){
            let href = anchor.getAttribute('href')
            let newURL = new URL(href,baseURL).href;
            urls.push(newURL);
        }
    }

    return urls;

}

 export async function parseHtml(url) {
     const response = await fetch(url);
     const html = await response.text();
     return html;
 }

 export async function crawlPage(baseURL, currentURL, pages){
    const bURL = new URL(baseURL)
     const cURL = new URL(currentURL)

    if(!bURL.host == cURL.host){
        return;
    }
    const normalURL = normalizeURL(currentURL);
    if(pages[normalURL]){
        pages[normalURL]++
        return;
    }
    else{pages[normalURL] = 1}

    const html = await parseHtml(currentURL);

    const urls = await getURLsFromHTML(html, baseURL)

     for (const url of urls) {

         await crawlPage(baseURL, url, pages);
     }
     console.log(pages)
 }



/*
new URL(input[, base])
#
History

    input <string> The absolute or relative input URL to parse. If input is relative, then base is required. If input is absolute, the base is ignored. If input is not a string, it is converted to a string first.
    base <string> The base URL to resolve against if the input is not absolute. If base is not a string, it is converted to a string first.

Creates a new URL object by parsing the input relative to the base. If base is passed as a string, it will be parsed equivalent to new URL(base).

const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
 */

