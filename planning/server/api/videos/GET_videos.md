# Get videos
@desc GET all videos
@route /api/videos
@access Protected -- API key

Example request: GET /api/videos?key=<API_KEY>

# EXAMPLE RESPONSE BODY
```
[
  {
    "_id": "607e384559c86677e2af65r7",
    "video_url": "s3.aws.indigenousplantgo.com/video/lavender-bloom.mp4",
    "caption": "A lavender flower blooming timelapse"
  },
  {
    "_id": "607e384559c86677ejdas65r7",
    "video_url": "s3.aws.indigenousplantgo.com/video/rose-bloom.mp4",
    "caption": "A rose flower blooming timelapse"
  }
  // ... Repeat
]
```