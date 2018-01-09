var autoprefixer = require('autoprefixer'),
    postcss = require('postcss'),
    webpack = require('webpack'),
    pkg = require('./package.json'),
    classPrefix = require('postcss-class-prefix');

var isProduction = process.argv.indexOf('-p') > -1,
    banner = pkg.name + ' v' + pkg.version + ' ' + pkg.homepage;

var exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    devServer: {
        contentBase: './',
        port: 3000
    },
    output: {
        path: __dirname,
        filename: 'eruda-code.js',
        publicPath: "/assets/",
        library: ['erudaCode'],
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.scss$/,
                loaders: [ 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () 
                            {
                                return [postcss.plugin('postcss-namespace', function () 
                                {
                                    // Add '.dev-tools .tools ' to every selector.
                                    return function (root) 
                                    {
                                        root.walkRules(function (rule) 
                                        {
                                            if (!rule.selectors) return rule;

                                            rule.selectors = rule.selectors.map(function (selector) 
                                            {
                                                return '.dev-tools .tools ' + selector;
                                            });
                                        });
                                    };
                                }), classPrefix('eruda-'), autoprefixer];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                loaders: [ 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () 
                            {
                                return [postcss.plugin('postcss-namespace', function () 
                                {
                                    // Add '.dev-tools .tools ' to every selector.
                                    return function (root) 
                                    {
                                        root.walkRules(function (rule) 
                                        {
                                            if (!rule.selectors) return rule;

                                            rule.selectors = rule.selectors.map(function (selector) 
                                            {
                                                return '.eruda-dev-tools .eruda-tools ' + selector;
                                            });
                                        });
                                    };
                                }), autoprefixer];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};

if (isProduction) {
    exports.devtool = false;
    exports.output.filename = 'eruda-code.min.js';
    exports.plugins = exports.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: /eruda-code/
        })
    ]);
}

module.exports = exports;