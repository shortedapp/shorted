/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    const stockProfileTemplate = path.resolve(
        `src/templates/stock-profile-template.js`,
    );
    return graphql(`
        {
            allStocksYaml {
                edges {
                    node {
                        code
                        sector
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }
        result.data.allStocksYaml.edges.forEach(({node}) => {
            createPage({
                path: node.code.toUpperCase(),
                component: stockProfileTemplate,
                context: {
                    code: node.code,
                },
            });
        });
    });
};
