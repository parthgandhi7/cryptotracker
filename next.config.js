const path = require('path')
const glob = require('glob')
const webpack = require("webpack");

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      // {
      //   test: /\.css$/,
      //   use: ['babel-loader', 'raw-loader']
      // },
      // {
      //   test: /\.s(a|c)ss$/,
      //   use: ['babel-loader', 'raw-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         includePaths: ['styles', 'node_modules']
      //           .map((d) => path.join(__dirname, d))
      //           .map((g) => glob.sync(g))
      //           .reduce((a, c) => a.concat(c), [])
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.less$/,
        use: ['babel-loader', 'raw-loader',
          {
            loader: 'less-loader',
            options: {
              includePaths: ['node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), []),
              javascriptEnabled: true
            }
          }
        ]
      }
    )
    return config
  }
}
