
module.exports = {
    cart: (req, res) => {
        res.render('cart',{
            cart,
            session: req.session
        });
    },
    emergente: (req, res) => {
        res.render('emergente');
    },
    vista: (req, res) => {
        res.render('vista');
    },

    formulario: (req, res) => {
        res.render('formulario');
    }
    
}
