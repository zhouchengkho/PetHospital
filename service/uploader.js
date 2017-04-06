/**
 * Created by zhoucheng on 4/6/17.
 */

var SocketIOFileUploadServer = require("socketio-file-upload");
var fs = require('fs');
function Uploader() {
  return function(socket) {
    var siofuServer = new SocketIOFileUploadServer();
    siofuServer.on("saved", function(event){
      console.log('saved');
      event.file.clientDetail.base = event.file.base;

      var oldPath =  event.file.pathName;
      var piece = oldPath.split('.');
      var format = piece[piece.length - 1];
      var newPath = siofuServer.dir + '/' + event.file.meta.id + '.'+ format;
      console.log(oldPath)
      console.log(newPath)
      fs.rename(oldPath, newPath, function(err){
        if(err){
          console.log(err)
          throw err;
        }
        console.log('done!');
      })
    });
    siofuServer.on("error", function(data){
    });
    siofuServer.on("start", function(event){
      if (/\.exe$/.test(event.file.name)) {
        console.log("Aborting: " + event.file.id);
        siofuServer.abort(event.file.id, socket);
      }
    });
    siofuServer.dir = "public/video";
    siofuServer.maxFileSize = 200000000;
    siofuServer.listen(socket);
  }

}

module.exports = new Uploader();
