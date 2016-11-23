var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var env = process.env.NODE_ENV || 'dev';
var configPath = path.resolve(__dirname, "config", "config." + env + ".js");
var config = require(configPath);
var COPYRIGHT = fs.readFileSync(path.resolve(__dirname, "COPYRIGHT")).toString();

module.exports = {
    context: __dirname + "/app",
    entry: __dirname + "/src/js/app.js",
    output: {
        path: __dirname + "/public/js",
        filename: "app.bundle.js"
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    debug: true,
    devtool: "eval",
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Peer: "peerjs/lib/peer",
            util: "peerjs/lib/util"
        }),
        new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(env),
            APP_CONFIG: JSON.stringify(config)
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$', 'jQuery', 'exports', 'require']
            }
        }),
        new webpack.BannerPlugin(COPYRIGHT)

    ]
};