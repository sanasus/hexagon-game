const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const extractSass = new ExtractTextPlugin({
    filename: "./assets/css/[name].css",
    fallback: "style-loader"
});
module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    use: extractSass.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    alias: {
                                        '@img': '../img',
                                        '@fonts': '../fonts'
                                    }
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers: ['ie >= 9', 'last 2 version']
                                        })
                                    ],
                                    sourceMap: true
                                }
                            },
                            // {
                            //     loader: "resolve-url-loader"
                            // },
                            {
                                loader: "sass-loader?sourceMap"
                            }
                        ]
                    })
                }
            ],
        },
        plugins: [
            extractSass
        ]
    };
};