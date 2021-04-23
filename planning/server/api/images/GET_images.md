# Get images
@desc GET all images
@route /api/images
@access Protected -- API key

Example request: GET /api/images?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "607e399e59c8feg7e2af65r7",
    "image_url": "s3.aws.indigenousplantgo.com/images/lavender-1.jpg",
    "caption": "lavender in a big field"
  },
  {
    "_id": "607e399e59c8feg7e2834n5r7",
    "image_url": "s3.aws.indigenousplantgo.com/images/rose.jpg",
    "caption": "roses in a big field"
  }
  // ... Repeat
]
```