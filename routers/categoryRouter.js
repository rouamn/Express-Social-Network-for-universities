const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

// Routes
router.post('/addcategories', categoryController.createCategory);
router.get('/getcategories/:id', categoryController.getCategory);
router.put('/updatecategories/:id', categoryController.updateCategory);
router.delete('/deletecategories/:id', categoryController.deleteCategory);

module.exports = router;