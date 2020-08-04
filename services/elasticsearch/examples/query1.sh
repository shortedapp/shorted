curl -XGET "http://localhost:8080/api/search/companies/_search" -H 'Content-Type: application/json' -d'
{
    "query": {
        "bool": {
          "should": [{
            "match_phrase_prefix": {
              "name": {
                "query": "telstra",
                "max_expansions": 10,
                "slop": 10
              }
            }
          },
          {
            "match": {
              "name": {
                "query": "telstra",
                "fuzziness": "AUTO",
                "operator": "and",
                "prefix_length": 1
              }
            }
          }]
        }
    }
}'