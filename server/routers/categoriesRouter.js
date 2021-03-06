const express = require('express')

module.exports = function({database, authorize}) {
  const router = express.Router()

  //Get All
  //GET /api/categories?key=<API_KEY>
  router.get('/', async (req, res) => {
    try {
      const result = await database.getCategories()
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Create
  //POST /api/categories
  router.post('/', authorize, async (req, res) => {
    try {
      const result = await database.createCategory(req.body)
      res.send(result.ops[0])
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get One
  //GET /api/categories/:categoryId?key=<API_KEY>
  router.get('/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId
      const result = await database.getCategory({categoryId})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Update
  //PUT /api/categories/:categoryId
  router.put('/:categoryId', authorize, async (req, res) => {
    try {
      const categoryId = req.params.categoryId
      const result = await database.updateCategory({categoryId, updatedCategory: req.body})
      res.send("Category updated")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Delete
  //DELETE /api/categories/:categoryId
  router.delete('/:categoryId', authorize, async (req, res) => {
    try {
      const categoryId = req.params.categoryId
      const result = await database.deleteCategory({categoryId})
      res.send("Category deleted")
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  //Get base on resource
  //GET /api/categories/group/:group?key=<API_KEY>
  router.get('/group/:group', async (req, res) => {
    try {
      const group = req.params.group
      const result = await database.getCategoryGroup({group})
      res.send(result)
    } catch (error) {
      console.error(error)
      res.status(401).send({error: error.message})
    }
  })

  return router
}
