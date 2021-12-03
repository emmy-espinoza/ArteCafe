const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

    detail: (req, res) => {
        db.Product.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    association: "images",
                },
            ],
        })
        .then((product) => {
            db.Product.findAll({
                where: {
                    categories_id: product.categories_id,
                },
                include: [
                    {
                        association: "images"
                    },
                ],
            })
            .then( products => {
                let productsSlider = products.filter( product => product.categories_id === 2 );
                res.render("productsDetail", {
                    titleSlider: "No te lo pierdas.",
                    productsSlider,
                    product,
                    session: req.session,
                    toThousand
                })
            })
        })
        .catch( err => console.log(err));

    },

  
    products: (req, res) => {
        db.Product.findAll({
            include: [
                {
                    association: "images"
                },
            ],
        })
        .then( products => {
            res.render('products', {
                products,
                session: req.session,
                toThousand
            })
        })
    },

    productsDesc: (req, res) => {
        db.Product.findAll({
            include: [
                {
                    association: "images"
                },
            ],
        })
        .then( products => {
            res.render('productsDesc',{
                products,
                toThousand
            })
        });       
    },

    accesorios: (req, res) => {
        db.Product.findAll({
            where: {
                categories_id : 2
            },
            include: [
                {
                    association: "images"
                },
            ],
        })
        .then( products => {
            res.render('accesorios', {
                products,
                session: req.session,
                toThousand
            })
        })
    },

    cafeteras: (req, res) => {
        db.Product.findAll({
            where: {
                categories_id : 1
            },
            include: [
                {
                    association: "images"
                },
            ],
        })
        .then( products => {
            res.render('cafeteras', {
                products,
                session: req.session,
                toThousand
            })
        })
    }

}