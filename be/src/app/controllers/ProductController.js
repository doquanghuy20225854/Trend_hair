const Product = require('../models/Product');
const { mutipleMongooseToOject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class ProductController { 
    // GET /home
    async show(req, res) {
        try {
            const products = await Product.find({});
            //console.log('Danh sách Product:', products);
            res.render('products/show', {
                products: mutipleMongooseToOject(products),
            });
        } catch (err) {
            res.status(400).json({ error: 'Lỗi khi lấy danh sách Sản phẩm' });
        }
    }
    // GET /san-pham/:slug
        async detail(req, res) {
            try {
            const product = await Product.findOne({ slug: req.params.slug });
            if (!product) return res.status(404).send('Không tìm thấy sản phẩm');

            res.render('products/detail', {
                product: mongooseToObject(product),
            });
            } catch (err) {
            res.status(500).send('Lỗi khi lấy chi tiết sản phẩm');
            }
        }
}

module.exports = new ProductController();
