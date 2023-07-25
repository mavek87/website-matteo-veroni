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
        filename: "[name].bundle.js"
    },
    optimization: {
        minimize: true,
        minimizer: [
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
            new TerserPlugin({
                parallel: true
            }),
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
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // "sass-loader"
                ]
            },
            {
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
                }
            ],
            options: {
                concurrency: 100
            },
        }),
    ],
}