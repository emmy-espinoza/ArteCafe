const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {

    index: (req, res) => {
        db.Product.findAll({
            include: [
                {
                    association: "images",
                },
            ],
        })
            .then(products => {
                let productsSlider = products.filter(product => product.categories_id === 1);
                let productsDesc = products.filter(product => product.discount >= 15);
                res.render('home', {
                    titleSlider: "Para los amantes del café.",
                    productsSlider,
                    productsDesc,
                    session: req.session,
                    toThousand
                })

            });
    },


    contact: (req, res) => {
        res.render('contact', {
            session: req.session,
        })
    },

    search: async(req, res) => {
        let products = await db.Product.findAll({
            include: [
                {
                    association: "images",
                },
            ],
        })
        let result = [];
        products.forEach(product => {
            if (product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(req.query.keywords.toLowerCase())) {
                result.push(product);
            }
        });
        res.render('results', {
            result,
            toThousand,
            session: req.session,
            search: req.query.keywords
        });
    },

    laEmpresa: (req, res) => {
        res.render('laEmpresa', {
            session: req.session
        });
    },

    cursos: (req, res) => {
        res.render('cursos',
            {
                session: req.session,
            });
    },
    
    trabajos: (req, res) => {
        res.render('trabajos', {
            session: req.session,
        })
    },

    sobreNosotros: (req, res) => {
        res.render('sobre_nosotros', {
            session: req.session
        });
    },

    meriendas: (req, res) => {
        res.render('meriendas',
            {
                session: req.session,
            });
    },
    molemos: (req, res) => {
        res.render('molemos', {
            session: req.session,
        })
    },
    gallery: (req, res) => {
        res.render('gallery',{
            session: req.session,
        });
    },
}

