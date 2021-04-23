# Update video
@desc PUT single video
@route /api/videos/:id
@access Protected -- API key, require user login

Example request: PUT /api/videos/607e399e59c8feg7e2af65r7?key=<API_KEY>

# EXAMPLE REQUEST BODY
```
{
  "video": "<file>",
  "caption": "lavender in a big field"
}
```

<file> represent file input
The video file must have key name "video"
If you don't provide a field that field will just remain as the old value

# SUCCESS RESPONSE BODY
```
"Video updated"
```