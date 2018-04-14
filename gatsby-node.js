const _ = require("lodash");
const kebabCase = require("lodash/kebabCase");
const path = require("path");

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const themeTemplate = path.resolve(`src/templates/theme.js`)
    console.log('here???')
    // Query for markdown nodes to use in creating pages.
    graphql(
      `
        {
          allTaxonomyTermThemes {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `
    ).then(result => {
      console.log('here2')
      if (result.errors) {
        console.log('yo yo yo')
        console.log(result.errors)
        debugger;
        resolve()
        // reject(result.errors);
      }


      // Create blog posts pages.
      _.each(result.data.allTaxonomyTermThemes.edges, edge => {
        createPage({
          path: `/themes/${kebabCase(edge.node.name)}`, // required
          component: themeTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
      resolve()
    })
  })
}