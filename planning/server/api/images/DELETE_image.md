# Delete image
@desc DELETE single image
@route /api/images/:id
@access Protected -- API key, require user login

Example request: DELETE /api/images/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Image deleted"
```
