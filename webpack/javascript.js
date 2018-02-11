module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /src/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['env']
                        }
                    }
                },
            ],
        },
    };
};