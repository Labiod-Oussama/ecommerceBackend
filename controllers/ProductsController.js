const Product = require('../models/Product');
const { verifyToken } = require('../middlewares/CheckJwt');
module.exports.getProducts = async (req, res) => {
    try {
        let Products = [];
        const Search = req.body.Search;
        const Category = req.body.Category == 'All' ? '^' : `^${req.body.Category}`;
        const typeOfCompany = req.body.typeOfCompany == 'All' ? '^' : `^${req.body.typeOfCompany}`;
        const typeOfColor = req.body.typeOfColor;
        const Shipping = req.body.Shipping ? [true] : [true, false];
        const Order = (req.body.Order === 'Price (Lowest)' ? { Price: -1 } : (req.body.Order === 'Price (Highest)' ? { Price: 1 } : {}))
        const page = req.body.page - 1 || 0;
        const ProductPerPage = 6;
        const regex = new RegExp(`^${Search}`, 'i');
        const MaxPrice = (await Product.find({
            Product_name: { $regex: regex },
            Product_type: { $regex: Category },
            Brand: { $regex: typeOfCompany },
            Color: typeOfColor == 'All' ? { $nin: [''] } : `${req.body.typeOfColor}`,
            Shipping: { $in: Shipping }
        }).sort({ Price: -1 }).limit(1));
         const Total = await Product.find({
            Product_name: { $regex: regex },
            Product_type: { $regex: Category },
            Brand: { $regex: typeOfCompany },
            Color: typeOfColor == 'All' ? { $nin: [''] } : `${req.body.typeOfColor}`,
            Shipping: Shipping
        }).count();
        await Product.find({
            Product_name: { $regex: regex },
            Product_type: { $regex: Category },
            Brand: { $regex: typeOfCompany },
            Color: typeOfColor == 'All' ? { $nin: [''] } : `${req.body.typeOfColor}`,
            Shipping: Shipping
        }).sort(Order).skip(page * ProductPerPage).limit(ProductPerPage).then((result) => {
            result.forEach(pro => Products.push(pro));
            res.status(200).json({ Products, Total, MaxPrice: MaxPrice[0]?.Price ?? 0 });
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'error': 'could not fetch' });
    };
}
module.exports.getOneProduct = async (req, res) => {
    const id = req.params.id;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // remove "Bearer " from the beginning
        const decodedToken = verifyToken(token);
        if (decodedToken) {
            await Product.findById({ _id: id })
                .then(result => res.status(200).json(result));
        } else {
            // handle unauthorized access
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        // handle missing or invalid authorization header
        res.status(401).json({ message: 'Invalid authorization header' });
    }
};
module.exports.getFeatured = async (req, res) => {
    let Featured = [];
    await Product.find({ Featured: true })
        .then(result => {
            result.forEach(pro => Featured.push(pro));
            res.status(200).json({ Featured })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ 'error': 'could not fetch' });
        })

}
module.exports.getSuggestion = async (req, res) => {
    const { Search } = req.body;
    const Suggestion = [];
    const nbrOfSuggestion = 7;
    const regex = new RegExp(`^${Search}`, 'i');
    await Product.find({ Product_name: { $regex: regex } }, { Product_name: 1 })
        .limit(nbrOfSuggestion)
        .then(result => {
            result.forEach(pro => Suggestion.push(pro))
            res.status(200).json({ Suggestion })
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ 'error': 'could not fetch' });
        });
}
module.exports.getProductsSearching = async (req, res) => {
    const { Search } = req.body;
    const Products = [];
    await Product.find({ Product_name: Search }).then((result) => {
        result.forEach(pro => Products.push(pro));
        res.status(200).json({ Products, Total: result.length });
    }).catch((error) => {
        console.error(error);
        res.status(500).json({ 'error': 'could not fetch' });
    });
}












