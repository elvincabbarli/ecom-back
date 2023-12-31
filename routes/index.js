const express = require('express')
const router = express.Router()

// DIGER ROTA DOSYALARINI ICE AKTARITYORUZ
const productRoutes = require('./products.js')
const categoryRoutes = require('./categories.js')
const authRoutes = require('./auth.js')
const couponRoutes = require('./coupon.js')

// HER ROTAYI ILGILI YOL ALTINDA KULLANIYORUZ

router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/auth', authRoutes)
router.use('/coupon', couponRoutes)

module.exports = router