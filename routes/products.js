const express = require('express')
const router = express.Router()
const Product = require('../model/Product')

// ADD NEW Products
router.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = new Product(product)
        await newProduct.save()

        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})



// TUM URUNLERI GETIRMEK
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})


// TEK BIR URUNU GETIRMEK
router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId

        try {
            const category = await Product.findById(productId)
            res.status(200).json(category)
        } catch (error) {
            res.status(404).json({ error: 'Product Not Found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})


// URUNU UPDATE ETMEK
router.put('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId
        const updateProduct = req.body

        try {
            const existingProduct = await Product.findById(productId)
            if (!existingProduct) {
                return res.status(404).json({ error: 'Product Not Found' })
            }
            const updatedProduct = await Product.findByIdAndUpdate(productId, updateProduct, { new: true })
            res.status(200).json(updatedProduct)
        } catch (error) {
            res.status(404).json({ error: 'Product Not Found' })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})


// PRODUCT DELETE
router.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId
        const deleteProduct = await Product.findOneAndDelete(productId)
        if (!deleteProduct) {
            return res.status(404).json({ error: 'Product Not Found' })
        }
        res.status(200).json(deleteProduct)


    } catch (error) {
        console.log(error)
        res.status(500).json({ send: "Server Error" })
    }
})

module.exports = router;