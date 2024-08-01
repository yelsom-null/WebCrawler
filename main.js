import {crawlPage, parseHtml} from './crawl.js'

let baseURL = 'https://www.google.com'
let pages = {}

await crawlPage(baseURL, baseURL,pages)

