const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = function () {
    return {
        plugins: [
            new ImageminPlugin(
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    pngquant: {
                        quality: '70-100'
                    }
                }
            )
        ]
    };
};