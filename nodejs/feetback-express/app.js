var express = require('express');

var app = express();

app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'));

var comments = [
    {
      name: '张三',
      message: '六一节快乐！',
      dateTime: '2018-06-01'
    },
    {
      name: '张三2',
      message: '六一节快乐！',
      dateTime: '2018-06-01'
    },
    {
      name: '张三3',
      message: '六一节快乐！',
      dateTime: '2018-06-01'
    },
    {
      name: '张三4',
      message: '六一节快乐！',
      dateTime: '2018-06-01'
    },
    {
      name: '张三5',
      message: '六一节快乐！',
      dateTime: '2018-06-01'
    }
]

app.get('/',function(req,res){
    res.render('index.html',{
        comments:comments
    })
})

app.get('/post',function(req,res){
    res.render('post.html');
})

app.get('/pinglun',function(req,res){
    var comment = req.query
    comment.dateTime = '2018-06-04';
    comments.unshift(comment);

    res.redirect('/');
    /* res.statusCode = 302;
    res.setHeader('Location','/')
    res.end(); */
})
app.listen(3000,function(){
    console.log('running...')
})