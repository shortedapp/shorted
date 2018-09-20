export const elasticsearchConfig = {
    hostname: `${process.env.ELASTICSEARCH_PROXY_MODE}://${process.env.ELASTICSEARCH_PROXY_HOST}:${process.env.ELASTICSEARCH_PROXY_PORT}${process.env.ELASTICSEARCH_PROXY_PREFIX}/`,
    indexNames: 'names',
    indexNutrients: 'nutrients',
    authentication: {
      username: 'elastic',
      password: 'changeme',
    },
  };