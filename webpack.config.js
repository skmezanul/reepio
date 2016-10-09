module.exports = {
    context: __dirname,
    entry: "./src",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/dist"
    },
    resolve: {
        extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/i, loader: "ts-loader" }
        ]
    },
    devtool: "eval-source-map"
};