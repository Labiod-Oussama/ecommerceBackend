const Cart = require('../models/Cart');
const { Types: { ObjectId } } = require('mongoose');
const { verifyToken } = require('../middlewares/CheckJwt');
module.exports.saveToCart = async (req, res) => {
  const { userId, productId, quantitiy, color } = req.body;
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        res.status(401).json({ message: 'Unauthorized' })
      }
      else {
        const userCart = await Cart.findOne({ userId });
        if (!userCart) {
          await Cart.create({
            userId,
            products: [{ productId, quantitiy, color }]
          });
        } else {
          const productIndexes = userCart.products.findIndex(prod => {
            return prod.productId.equals(new ObjectId(productId)) && prod.color.startsWith(color)
          })
          if (productIndexes !== -1) {
            userCart.products[productIndexes].quantitiy += quantitiy;
          }
          else {
            userCart.products.push({ productId, quantitiy, color });
          }
          await userCart.save();
          return res.status(200).json({ alert: "Added successfully" });
        }
        return res.status(200).json({ alert: "Added successfully" });
      }
    } else {
      res.status(401).json({ message: 'Invalid authorization header' })
    }
  } catch (error) {
    return res.status(500).json({ alert: "Failed to add to cart" });
  }
};
const getCarts = async (id) => {
  let carts = [];
  try {
    const result = await Cart.find({ userId: new ObjectId(id) }).populate({
      path: 'products.productId',
      select: ['Product_name', 'Price', 'image']
    });
    result.forEach(res => carts.push(res));
    return carts;
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch carts');
  }
};
module.exports.getCarts = async (req, res) => {
  const id = req.params.id;
  try {
    const carts = await getCarts(id);
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch carts' });
  }
}
module.exports.deleteCart = async (req, res) => {
  const { userId, productId, color } = req.body;
  const userCart = await Cart.findOne({ userId });
  try {
    const productIndex = userCart.products.findIndex(prod => prod.productId.equals(new ObjectId(productId)) && prod.color === color);
    if (productIndex !== -1) {
      userCart.products.splice(productIndex, 1);
    }
    await userCart.save();
    const carts = await getCarts(userId);
    res.status(200).json(carts);

  } catch (error) {
    res.status(500).json({ alert: 'failed to fetch' })
  }
}

