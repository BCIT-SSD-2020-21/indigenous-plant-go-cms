const express = require('express')

module.exports = function({database, authorize, upload, s3}) {
  const router = express.Router()

  //Get All
  //GET /api/audios
  router.get('/', async (req, res) => {
    try {
      const result = await database.getAudios()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/audios
  router.post('/', authorize, upload.single('audio'), async (req, res) => {
    try {
      const url = req.file ? req.file.location : null
      const result = await database.createAudio({url: url, newAudio: req.body})
      res.send(result.ops[0])
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/audios/:audioId
  router.get('/:audioId', async (req, res) => {
    try {
      const audioId = req.params.audioId
      const result = await database.getAudio({audioId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/audios/:audioId
  router.put('/:audioId', authorize, upload.single('audio'), async (req, res) => {
    try {
      const url = req.file ? req.file.location : null
      const audioId = req.params.audioId
      const result = await database.updateAudio({audioId, url: url, updatedAudio: req.body, s3})
      res.send("Audio file updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //DELETE /api/audios/:audioId
  router.delete('/:audioId', authorize, async (req, res) => {
    try {
      const audioId = req.params.audioId
      const result = await database.deleteAudio({audioId, s3})
      res.send("Audio file deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}