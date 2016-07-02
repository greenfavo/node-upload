window.onload=function () {
	var btn=document.getElementById('btn');
	var file=document.getElementById('file');
	file.addEventListener('change',function (e) {
		handlePreview(file.files);//图片本地预览
		handleUpload();		
	},false);

	btn.addEventListener('click',function (e) {
		if (file) {
			file.click();//自定义上传按钮样式
		}
		e.preventDefault();		
	});
}

//显示图片预览图
function handlePreview(files) {
	console.log(files);
	for(var i=0;i<files.length;i++){
		var file=files[i];
		var imageType=/^image\//;
		if (!imageType.test(file.type)) {
			continue;
		}
		var img=document.createElement('img');
		img.classList.add('obj');
		img.file=file;
		img.width = 200;
		img.height=200;
		//假设'preview'是将要展示图片的div
		document.getElementsByClassName('preview')[0].appendChild(img);
		var reader=new FileReader();
		reader.onload=(function (aImg) {
			return function (e) {
				aImg.src=e.target.result;
			};
		})(img);
		reader.readAsDataURL(file);

	}
}

//处理上传
function  handleUpload() {
	var progressBody=document.getElementsByClassName('progress')[0];
	var progressBar=document.getElementsByClassName('bar')[0];
	var msg=document.getElementById('msg');
	var fd=new FormData();
	fd.append('file',file.files[0]);

	var xhr=new XMLHttpRequest();
	progressBody.style.display='block';
	msg.innerText='';
	//监听上传进度
	(xhr.upload||xhr).addEventListener('progress',function (e) {
		var done=e.position||e.loaded;
		var total=e.totalSize||e.total;
		var percent=Math.round(done/total*100)+'%';
		progressBar.style.width = percent;
		console.log('xhr progress: '+percent);
	});
	xhr.addEventListener('load',function (e) {
		msg.innerText+='complete';
		console.log('complete');
	});
	xhr.onreadystatechange=function () {
		if (xhr.readyState===4 && xhr.status===200) {
			var json=JSON.parse(xhr.responseText);
			msg.innerText+=json.message;
		}
	}
	xhr.open('post','/upload',true);
	xhr.send(fd);
}