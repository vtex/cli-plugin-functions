import webpack from 'webpack'
import webpackConfig from '/.webpackConfig'


webpack({
  // [Configuration Object](/configuration/)
}, (err, stats) => { // [Stats Object](#stats-object)
  if (err || stats.hasErrors()) {
    // [Handle errors here](#error-handling)
  }
  // Done processing
});
