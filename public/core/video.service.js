module.exports = function videoService($http, $q, youtubeApiKey){  
  function mapData(responce){
    console.log(responce.data);
    return responce.data;
  }
  
  function mapVideosData(data){
    return data.items;
  }
  
  function error (err) {
    return err;
  }
  
  function mapYoutubeData(data) {
    console.log('ytb', data);
    if (data.items && data.items[0]) {
      return {
        views: data.items[0].statistics.viewCount
      };
    }
    
    return {
      error: 'This video is unavailable'
    };
  }
  
  function mapFBData(data){
    return {
      views: data.views,
      url: data.source
    }
  }
  
  function getVideos() {
    return $http({
      method: 'GET',
      url: 'https://cdn.playbuzz.com/content/feed/items'
    }).then(mapData, error).then(mapVideosData);
  }
  
  function getVideoUrl(videoItem) {
    switch(videoItem.source) {
    case 'youtube':
        return 'http://www.youtube.com/embed/' + videoItem.videoId;
    case 'url':
        return videoItem.url;
    case 'facebook':
        return 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fyahooindia%2Fvideos%2F' + videoItem.videoId + '%2F&width=720';
    default:
        return '';
    }
  }
  
  function getVideoData(videoItem) {
    switch(videoItem.source) {
    case 'youtube':
        return $http({
          method: 'GET',
          params: {
            part: 'statistics',
            id: videoItem.videoId,
            key: youtubeApiKey
          },
          url: 'https://www.googleapis.com/youtube/v3/videos'
        }).then(mapData).then(mapYoutubeData);
    case 'url':
        return $q.resolve({
          views: videoItem.views
        });
    case 'facebook':
        return $http({
          method: 'GET',
          url: 'https://graph.facebook.com/' + videoItem.videoId
        }).then(mapData).then(mapFBData);
    default:
        var deferred = $q.defer();
        deferred.reject(videoItem);
        return deferred.promise;
    }
  }
  
  return {
    getVideosList: getVideos,
    getVideoData: getVideoData,
    getVideoUrl: getVideoUrl
  }
}
/*]);*/