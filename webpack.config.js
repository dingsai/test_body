var webpack = require('webpack');
var path = require('path');
module.exports={
    entry:{
        yindao:'./js/yindao.js',
        sex:'./js/sex.js',
        Medical_history:'./js/Medical_history.js',
        allergy_food:"./js/allergy_food.js",
        hate_food:"./js/hate_food",
        test:"./js/test",
        pinghezhi:"./js/pinghezhi"
    },
    output:{
        path:'dist/',
        filename:'js/[name].js',
        publicPath:'../dist/'
    },
    module:{
        loaders:[
            {test:/\.css$/, loader:'style!css'},
            {test: /\.scss$/, loaders: ["style", "css", "sass"]},
            {test:/\.(png|jpg|gif)$/, loader:'url-loader?limit=8192&name=img/[name].[ext]'},
            {test: /\.js$/, loader: 'babel', exclude: 'node_modules/'}
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ]
};