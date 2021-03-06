const express = require('express')

module.exports = function({database, authorize}) {
  const router = express.Router()

  //Get All
  //GET /api/learn_more?key=<API_KEY>
  router.get('/', async (req, res) => {
    try {
      const result = await database.getLearnMores()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/learn_more
  router.post('/', authorize, async (req, res) => {
    try {
      const result = await database.createLearnMore({newLearnMore: req.body, user_id: req.user._id})
      res.send("Learn more added")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/learn_more/:learnMoreId?key=<API_KEY>
  router.get('/:learnMoreId', async (req, res) => {
    try {
      const learnMoreId = req.params.learnMoreId
      const result = await database.getLearnMore({learnMoreId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/learn_more/:learnMoreId
  router.put('/:learnMoreId', authorize, async (req, res) => {
    try {
      const learnMoreId = req.params.learnMoreId
      const result = await database.updateLearnMore({learnMoreId, updatedLearnMore : req.body, user_id: req.user._id})
      res.send("Learn more updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //DELETE 
  //DELETE /api/learn_more/:learnMoreId
  router.delete('/:learnMoreId', authorize, async (req, res) => {
    try {
      const learnMoreId = req.params.learnMoreId
      const result = await database.deleteLearnMore({learnMoreId})
      res.send("Learn more deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}