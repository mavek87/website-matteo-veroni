const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "app.bundle.js"
    },
    optimization: {
        minimize: true,
        minimizer: [
            // CSS minification
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            }),
            // JS minification
            new TerserPlugin({
                parallel: true
            }),
            // Images minification
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [
                                                                { xmlns: "http://www.w3.org/2000/svg" }
                                                            ]
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]  //Preset used for env setup
                    }
                }
            },
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // "sass-loader"
                ]
            },
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: path.resolve(__dirname, "./dist/index.html"),
            template: path.resolve(__dirname, "./src/index.html")
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./src/assets"),
                    to: path.resolve(__dirname, "./dist/assets")
                },
                {
                    from: path.resolve(__dirname, "./src/libs/fontawesome-free-6.4.0-web/css/all.min.css"),
                    to: path.resolve(__dirname, "./dist/css/all.min.css")
                },
                {
                    from: path.resolve(__dirname, "./src/libs/fontawesome-free-6.4.0-web/webfonts"),
                    to: path.resolve(__dirname, "./dist/webfonts")
                }
                // {
                //     from: path.resolve(__dirname, "./src/fonts"),
                //     to: path.resolve(__dirname, "./dist/fonts")
                // }
                // {
                //     from: path.resolve(__dirname, "./src/libs/google-fonts/webfonts"),
                //     to: path.resolve(__dirname, "./dist/webfonts")
                // }
            ],
            options: {
                concurrency: 100
            },
        }),
    ],
}