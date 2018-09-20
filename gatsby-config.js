const path = require('path');
module.exports = {
    siteMetadata: {
        title: 'Shorted',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/data/stocks`,
                name: 'stocks',
            },
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
              src: path.join(__dirname, 'src'),
              pages: path.join(__dirname, 'src/pages')
            }
          }
    ],
};
