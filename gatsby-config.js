const path = require('path');

// gatsby-config.js

let activeEnv = process.env.ACTIVE_ENV;

if (!activeEnv) {
    activeEnv = 'development';
}

require('dotenv').config({
    path: `.env.${activeEnv}`,
});
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
                pages: path.join(__dirname, 'src/pages'),
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: "UA-119767237-2",
              // Puts tracking script in the head instead of the body
              head: false,
              // Setting this parameter is optional
              anonymize: false,
              // Setting this parameter is also optional
              respectDNT: false
            },
        },
    ],
};
