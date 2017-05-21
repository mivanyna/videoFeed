require('./public/app.js');
/*require('./node_modules/angular-mocks/angular-mocks');*/

// Include *.spec.js files
var context = require.context('./public', true, /.+\.spec\.js$/);
context.keys().forEach(context);