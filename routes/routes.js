var upload=require('../controls/upload.js');
module.exports=function (app) {
	app.get('/',upload.show);
	app.post('/upload',upload.handleUpload);
}