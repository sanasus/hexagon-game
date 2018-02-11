module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.(html|pug)$/,
                    use: ['html-loader', 'pug-html-loader?pretty&exports=false']
                }
            ],
        },
    };
};