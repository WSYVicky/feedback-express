var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/',express.static('./public/'))

//配置使用art-template模版引擎
//第一个参数：当渲染以 .art 结尾的文件时候，使用art-template模版引擎
app.engine('html',require('express-art-template'))

//Express 为 Response 相应对象提供了一个方法：render
//render方法默认不可使用，但如果配置了模版引擎就可以使用了
//res.render('html模版名'，{模版数据})
//默认第一个参数不能写路径，会去项目中的views目录查砸后该模版
//也就是说 Expresss 有一个约定：开发人员把所有的视图文件都放到 views 目录中

//若想修改默认views目录，则可以
//app.set('views',render函数的默认路径)

//配置 body-parser 中间件（插件，专门用来解析表单POST请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

app.get('/',function(req,res){
  res.render('index.html',{
    comments: comments
  })
})

app.get('/post',function(req,res){
  res.render('post.html')
})

//当以POST请求 /post 的时候，执行指定的处理函数
//这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post',function (req,res){
  //1.获取表单 Post 请求体数据
  var comment = req.body
  //2.处理
  comment.dateTime = '2017-11-5 10:58:51'
  comments.unshift(comment)
  //3.发送响应,重定向
  res.redirect('/')
  //4.结束响应：Express 方法会自动结束响应
})

// app.get('/pinglun',function(req,res){
//   req.query 只能拿 GET 请求的数据
//   var comment =req.query
//   comment.dateTime = '2017-11-5 10:58:51'
//   comments.unshift(comment)
//   res.redirect('/')
//   // res.statusCode = 302
//   // res.setHeadr('Location','/')
// })

app.listen(3000,function () {
  console.log('app is running...')
})