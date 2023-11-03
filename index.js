const Koa = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template');
const getData = require('./2')
const { resolve } = require('path')
const app = new Koa();
const router = new Router()

render(app, {
    root: resolve(__dirname, 'html'),   // 视图的位置
    extname: '.html',  // 后缀名
});

router.get('/', async (ctx) => {
    const data = await getData()
    console.log('movie data', data);
    // @ts-ignore
    await ctx.render("index", {
        movieList: data
    })
})


app.use(router.routes())
app.use(router.allowedMethods({
    throw: true // 抛出错误，代替设置响应头状态
}))

app.listen(3000, () => {
    console.log('项目已启动, http://localhost:3000')
})