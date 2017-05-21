module.exports = function sharedModel(videoService, $sce){
  
  var model = { 
    videos: [] 
  };
  
  function success(data){
    model.videos = data;
    model.videos.forEach(function(video) {      
  
      video.src = $sce.trustAsResourceUrl(
        videoService.getVideoUrl(video)
      );
      
      videoService.getVideoData(video).then(
        function(data) {
          video.views = data.views;
          video.error = data.error;
          if (data.url){
            video.src = $sce.trustAsResourceUrl(data.url);
          }
        },
        function(err){
          console.error('error dir', video, err);
          video.error = err.data ? err.data.error.message : 'An error ocured!';
        }
      );
    });
  }
                         
  
  function error(error) {
    console.error(error);
  }
  
  videoService.getVideosList().then(
    success,
    error
  );
  
  return {
    model: model
  }
}