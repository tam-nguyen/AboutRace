module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
      //  apiBase: `api`, // optional, defaults to `jsonapi`
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://distributeddesign.institute/RacePI/`
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
