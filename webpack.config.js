var webpack = require('webpack');

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
        })
    ]
};