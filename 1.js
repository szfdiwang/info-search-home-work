const puppeteer = require('puppeteer');
(async () => {
    // 开启 browser  
    const browser = await puppeteer.launch({
        headless: false
    });
    // 新建页面
    const page = await browser.newPage()
    await page.goto(`https://www.baidu.com`)
    // 等待输入框出现  
    await page.waitForSelector("input[class='s_ipt']")
    // 点击搜索按钮  
    await page.type("input[class='s_ipt']", 'puppeteer')
    await page.click("input[id='su']")
    // 模拟sleep2秒
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve('done')
        }, 2000);
    })
    // 对当前页面截图
    await page.screenshot({ path: 'images/example.png' })
    // 关闭浏览器
    await browser.close()
})();
