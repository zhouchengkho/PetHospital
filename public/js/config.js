requirejs.config({
	paths: {
		"SocketIOFileUpload": "/js/client",
		"socket.io": "/js/socket.io"
	}
});

require(["socket.io", "SocketIOFileUpload"], function (io, SocketIOFileUpload) {
	// jQuery version
	function flash(message){

    $.toaster({priority: 'success', title: 'Success', message: message});

  }

  //获取url中的参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }

	var socket = io.connect();
	var uploader = new SocketIOFileUpload(socket);

  let opts = {
    lines: 13 // The number of lines to draw
    , length: 20 // The length of each line
    , width: 10 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#ffc300' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
  };
  let target = document.getElementById('spinner');
  var spinner;
	uploader.addEventListener("complete", function(event){
		console.log(event);
		flash("Upload Complete: "+event.file.name);

    spinner.stop();
    $.toaster({priority: 'success', title: 'Success', message: event.file.name + ' uploaded'});
	});
	uploader.addEventListener("choose", function(event){
		flash("Files Chosen: "+event.files);
	});
	uploader.addEventListener("start", function(event){
	  console.log('start: ')
    console.log(event)
		event.file.meta.id = getUrlParam('id');

    spinner = new Spinner(opts).spin(target);

	});
	uploader.addEventListener("progress", function(event){
		// console.log(event);
    // $.toaster({priority: 'success', title: 'Success', message: "File is" + event.bytesLoaded/event.file.size*100 + "percent loaded"});

	});
	uploader.addEventListener("load", function(event){
		// flash("File Loaded: "+event.file.name);
		console.log(event);
	});
	uploader.addEventListener("error", function(event){
		flash("Error: "+event.message);
		console.log(event.message);
		if (event.code === 1) {
			alert("Don't upload such a big file");
		}
	});
	uploader.maxFileSize = 200000000;
	uploader.useBuffer = true;
	uploader.chunkSize = 1024;
	//uploader.useText = true;
	//uploader.serializedOctets = true;
	document.getElementById("ul_btn").addEventListener("click", function(){
		uploader.prompt();
	}, false);
	uploader.listenOnInput(document.getElementById("plain_input_element"));
	uploader.listenOnDrop(document.getElementById("file_drop"));

	window.uploader = uploader;
});
