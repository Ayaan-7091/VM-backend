const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config()



const authRoutes = require('./routes/auth.routes.js')
app.use('/auth',authRoutes)

const userRoutes = require('./routes/user.routes.js')
app.use('/user',userRoutes)

const productRoutes = require('./routes/product.routes.js')
app.use('/products',productRoutes)

const adminProductRoutes = require('./routes/adminProduct.routes.js')
app.use('/admin/products',adminProductRoutes)

const cartRoutes = require('./routes/cart.routes.js')
app.use('/cart',cartRoutes)

const cartItemRoutes = require('./routes/cartItem.routes.js')
app.use('/cart_items',cartItemRoutes)

const orderRoutes = require('./routes/order.routes.js')
app.use('/orders',orderRoutes)

const reviewRoutes = require('./routes/review.routes.js')
app.use('/reviews',reviewRoutes)

const adminOrderRoutes = require('./routes/adminOrder.routes.js')
app.use('/admin/orders',adminOrderRoutes)

const bannerRoutes = require('./routes/banner.routes.js')
app.use("/banner",bannerRoutes)

const paymentRoutes = require('./routes/payment.routes.js')
app.use('/payment/',paymentRoutes)

module.exports = app