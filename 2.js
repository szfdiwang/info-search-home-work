const puppeteer = require('puppeteer');

const getData = async () => {
    const browser = await puppeteer.launch({
        headless: false
    }),
        url = 'https://movie.douban.com/cinema/nowplaying/shenzhen/',
        page = await browser.newPage()
    await page.goto(url, { timeout: 30 * 1000, waitUntil: 'networkidle2' }) //500毫秒内没有任何连接
    const result = await page.evaluate(() => {
        // 判断是否支持jQuery 在console中输入jQuery
        // @ts-ignore
        const $ = window.$,
            item = $('.lists .list-item');
        let data = []

        item.each((index, item) => {
            let obj = {}
            const el = $(item)
            const detail = el.context.dataset
            const imgLink = el.find('ul .poster a img')[ 0 ][ 'currentSrc' ]
            obj.imgLink = imgLink
            obj.actors = detail.actors
            obj.category = detail.category
            obj.director = detail.director
            obj.duration = detail.duration
            obj.region = detail.region
            obj.release = detail.release
            obj.score = detail.score
            obj.star = detail.star
            obj.title = detail.title
            obj.votecount = detail.votecount
            data.push(obj)
        })
        return data
    })

    await browser.close()
    return result
}
// 开启 browser  

module.exports = getData
