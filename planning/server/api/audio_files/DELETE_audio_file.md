# Delete audio
@desc DELETE single audio file
@route /api/audios/:id
@access Protected -- API key, require user login

Example request: DELETE /api/audios/607e399e59c8feg7e2af65r7?key=<API_KEY>

# SUCCESS RESPONSE BODY
```
"Audio file deleted"
```
