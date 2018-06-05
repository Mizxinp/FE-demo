var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');

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

http
    .createServer(function(req,res){
        var urlObj = url.parse(req.url,true);
        var pathName = urlObj.pathname;
        if( pathName === '/'){
            fs.readFile('./views/index.html',function(error,data){
                if(error){
                    return res.end('404 is not found');
                }
                var htmlStr = template.render(data.toString(),{
                    comments : comments
                })
                
                res.end(htmlStr);
            })
        }else if(pathName === '/post'){
            fs.readFile('./views/post.html',function(error,data){
                if(error){
                    return res.end('404 not found');
                }
                res.end(data);
            })
        }else if(pathName.indexOf('/public') === 0){
            fs.readFile('.' + pathName, function (err, data) {
                if (err) {
                  return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }else if( pathName ==='/pinglun'){
            var comment = urlObj.query;
            // console.log(comment)
            comment.dataTime = '2018-05-31 22:57';
            comments.unshift(comment);
            //重定向
            res.statusCode = 302;
            res.setHeader('Location','/');
            res.end();
        }else {
            // 其它的都处理成 404 找不到
            fs.readFile('./views/404.html', function (err, data) {
              if (err) {
                return res.end('404 Not Found.')
              }
              res.end(data)
            })
          }
        
    })
    .listen(3000,function(){
        console.log('running...');
    })