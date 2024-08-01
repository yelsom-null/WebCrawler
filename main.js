import {parseHtml, crawlPage} from './crawl.js'

let baseURL = ''
let pages = {}

const response = await crawlPage();

