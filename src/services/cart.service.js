const Cart = require('../models/cart.model.js')
const CartItem = require('../models/cartItem.model.js')
const Product = require('../models/product.model.js')

async function createCart(user){
    try {
        
        const cart = new Cart({user})
        const createdCart = await cart.save()
        return createdCart

    } catch (error) {
        throw new Error(error.message)
    }
}

async function findUserCart(userId) {
    let cart = await Cart.findOne({ user: userId });
    let cartItems = await CartItem.find({ cart: cart._id }).populate('product');
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
        totalPrice += cartItem.price;
        totalDiscountedPrice += cartItem.discountedPrice;
        totalItem += cartItem.quantity;
      
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
}


async function addCartItem(userId, req) {
    try {
        // Fetch the cart for the user
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found for user");
        }

        // Fetch the product by its ID
        let product = await Product.findById(req.productId);
        if (!product) {
            throw new Error("Product not found");
        }

        // Check if the product is already in the cart
     
        
        // Log the received variant
        let variant = req.variant;
        console.log("Received variant:", variant);

        // If the product is not already in the cart, add it
       
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                discountedPrice: product.discountedPrice,
                variant: variant
            });

            // Log cart item data before saving
            console.log("Cart item data before save:", cartItem);

            // Save the cart item and add it to the cart
            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();

            // Log success message
            console.log("Item successfully added to cart");
            return "Item added to cart";
     

    } catch (error) {
        // Log and throw any errors encountered
        console.error("Error adding item to cart:", error.message);
        throw new Error(error.message);
    }
}


 

module.exports={createCart,findUserCart,addCartItem}