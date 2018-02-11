const tsconf = require('../tslint.json');
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader',
                    exclude: /node_modules/,
                    options: {
                        failOnHint: true,
                        configuration: tsconf
                    }
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ],
        },
    };
};