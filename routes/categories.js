const express = require('express')
const router = express.Router()
const Category = require('../model/Category.js')

// ADD NEW CATEGORY
router.post('/', async (req, res) => {
    try {
        const { name, img } = req.body;
        const newCategory = new Category({ name, img })
        await newCategory.save()

        res.status(201).json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})

// TUM Kateqorileri GETIRMEK
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})


// GET SINGLE CATEGORY ITEM
router.get('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId

        try {
            const category = await Category.findById(categoryId)
            res.status(200).json(category)
        } catch (error) {
            res.status(404).json({ error: 'Category Not Found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})


// UPDATE CATEGORY ITEM
router.put('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const updateCategory = req.body

        try {
            const existingCategory = await Category.findById(categoryId)
            if (!existingCategory) {
                return res.status(404).json({ error: 'Category Not Found' })
            }
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateCategory, { new: true })
            res.status(200).json(updatedCategory)
        } catch (error) {
            res.status(404).json({ error: 'Category Not Found' })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})



// CATEGORY DELETE
router.delete('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const deleteCategory = await Category.findOneAndDelete(categoryId)
        if (!deleteCategory) {
            return res.status(404).json({ error: 'Category Not Found' })
        }
        res.status(200).json(deleteCategory)


    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})


module.exports = router;