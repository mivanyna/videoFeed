const angular = require('angular');
const appName = require('./app.module.js');
const filter = require('./core/thousand-suffix.filter.js');
const sharedModel = require('./core/shared.model.js');
const videoService = require('./core/video.service.js');

const MainController = require('./components/main-container.component.js');
const VideoItemController = require('./components/video-item.component.js')

module.exports = angular.module(appName)
  .value('youtubeApiKey', 'AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw')
  .component('mainContainer', {
    templateUrl: './components/main-container.component.html',
    controller: ['sharedModel', MainController]
  })
  .component('videoItem', {
    templateUrl: './components/video-item.component.html',
    controller: VideoItemController,
    bindings: {
      video: '<'
    }
  })
  .service('videoService', ['$http', '$q', 'youtubeApiKey', videoService])
  .service('sharedModel', ['videoService', '$sce', sharedModel])
  .filter('thousandSuffix', filter)
  .name;