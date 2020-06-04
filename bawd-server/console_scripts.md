## Removing unsanitary posts and board
### Remove boards where the title is longer than 32 characters
```
GET boards/_delete_by_query
{
  "query": {
    "bool" : {
      "filter" : {
        "script" : {
          "script" : {
            "source": "doc['name'].value.length() > 32",
            "lang": "painless"
          }
        }
      }
    }
  }
}
```
### Remove posts where boards where the title is longer than 32 characters
```
GET posts/_delete_by_query
{
  "query": {
    "bool" : {
      "filter" : {
        "script" : {
          "script" : {
            "source": "doc['board._source.name.keyword'].value.length() > 32",
            "lang": "painless"
          }
        }
      }
    }
  }
}
```
### Get a list of board ids that are currently in use by posts
```
GET posts/_search
{
  "size": 0,
  "aggs": {
    "boards": {
      "terms": { 
        "field": "board._id",  
        "size": 500 
      }
    }
  }
}
```
### Get a list of board ids that exist
```
GET boards/_search
{
  "size": 0,
  "aggs": {
    "ids": {
      "terms": {
        "field": "_id",
        "size": 500 
      }
    }
  }
}
```
### Delete boards by a list of ids
```
GET boards/_delete_by_query
{
  "query": {
    "bool": {
      "must_not": [
        {
          "ids": {
            "values": [
              "IOt9c3IBkrIfXMdpXC9i",
              "z2A96XEBByLeCRUQSrgR",
              "tuOO7XEBkrIfXMdpMKUz",
              "zSw6dHIB2DB0ChNHp_kM",
              "1usucnIBkrIfXMdpyC6W",
              "bmJic3IBByLeCRUQoVqL",
              "zmA66XEBByLeCRUQXbjA",
              "4WL-dHIBByLeCRUQj1xd",
              "cmKHc3IBByLeCRUQ01qh",
              "jOsVdXIBkrIfXMdpTTGl",
              "qCWj6HAB2DB0ChNHWs7y",
              "yyxpc3IB2DB0ChNHA_ku"
            ]
          }
        }
      ]
    }
  }
}
```

#### Map buckets for removing posts
```
.map((id) => ({ "match": { "board._id": id.key } })))
```
### Delete posts by a list of ids
```
GET posts/_delete_by_query
{
  "query": {
    "bool": {
      "must_not": [
        { "match": { "board._id": "1usucnIBkrIfXMdpyC6W" } },
        { "match": { "board._id": "4WL-dHIBByLeCRUQj1xd" } },
        { "match": { "board._id": "IOt9c3IBkrIfXMdpXC9i" } },
        { "match": { "board._id": "bmJic3IBByLeCRUQoVqL" } },
        { "match": { "board._id": "cmKHc3IBByLeCRUQ01qh" } },
        { "match": { "board._id": "jOsVdXIBkrIfXMdpTTGl" } },
        { "match": { "board._id": "tuOO7XEBkrIfXMdpMKUz" } },
        { "match": { "board._id": "yyxpc3IB2DB0ChNHA_ku" } },
        { "match": { "board._id": "z2A96XEBByLeCRUQSrgR" } },
        { "match": { "board._id": "zSw6dHIB2DB0ChNHp_kM" } }
      ]
    }
  }
}
```
### Delete any boards that don't have a category
```
GET boards/_delete_by_query
{
  "query": {
    "bool": {
      "must_not": {
        "exists": {
          "field": "category"
        }
      }
    }
  }
}
```