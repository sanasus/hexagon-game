module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: '[name].[ext]',
                                useRelativePath : true,
                                outputPath: './assets/img/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                useRelativePath : true,
                                outputPath: './assets/fonts/'
                            }
                        }]
                }
            ],
        },
    };
};