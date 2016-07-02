var express=require('express');
var app=express(),
	swig=require('swig');

var routes=require('./routes/routes.js');

app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views',__dirname+'/views');

//加载静态文件中间件
app.use(express.static(__dirname+'/public'));

//加载路由
routes(app);

//处理404
app.use(function (req,res) {
	res.status(404);
	res.render('404',{title:404});
});
//处理500
app.use(function (err,req,res) {
	console.log(err.stack);
	res.status(500);
	res.render('500',{title:500});
})

app.listen(3000,function () {
	console.log('Example app listening on port 3000!');
});