const cartService = require('../services/cart.service');

const findUserCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).send(cart);
    } catch (error) {
          console.error("addItemToCart error:", error);
        return res.status(500).send({ error: "failed to add item to cart" });
    }
};

const addItemToCart = async (req, res) => {
    console.log("working")
    const user = req.user;

    try {
        const cartItem = await cartService.addCartItem(user._id, req.body);
        return res.status(200).send(cartItem);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    findUserCart,
    addItemToCart
};
