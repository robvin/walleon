// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'HA Control',
    siteUrl: 'https://lejtzen.github.io',
    pathPrefix: '/ha-control',
    plugins: [
        {
            use: 'gridsome-plugin-svg',
            options: {
                // default options below
                goesBothWays: true,
                svgo: [
                    {
                        removeTitle: false
                    },
                    {
                        prefixIds: {
                            prefix: (_, {path}) => basename(path, '.svg'),
                            delim: '-',
                        },
                    },
                    {
                        removeDesc: false
                    },
                    {
                        removeViewBox: false,
                    },
                    {
                        sortAttrs: true,
                    }
                ],
            }
        }
    ],
}
