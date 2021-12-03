
const { validationResult } = require("express-validator"); // Importo el validator para validar las request
let bcrypt = require("bcryptjs"); // Importo el encriptador para guardar los passwords de manera segura
let db = require("../database/models"); // Importo la base de datos para poder comunicarme

//req = request: Son los datos que me llegan al entrar al método.
//res = response: Acciones que puedo ejecutar

module.exports = {

  loginForm: (req, res) => {

    res.render("loginForm", {
      session: req.session,
    }); // Renderiza la vista "loginForm y le pasa la session"

  },

  register: (req, res) => {
    res.render("register", {
      session: req.session,
    });
  },

  profile: (req, res) => {
    let user = users.find((user) => user.id === req.session.user.id);

    res.render("Profile", {
      user,
      session: req.session,
    });
  },

  userProfileEdit: (req, res) => {
    
    res.render("userProfileEdit", {
      session: req.session,
    });

  },

  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: { email: req.body.email },
      })
        .then((user) => {
          req.session.user = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar,
            rol: user.rol,
          };

          if(req.body.remember) {
            res.cookie("userarte_cafe", req.session.user, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true,
              secure: true,
            });
          }

          res.locals.user = req.session.user;

          res.redirect("/");
        })
        .catch((error) => {
          res.send(error);
        });
    } else {
      res.render("loginForm", {
        errors: errors.mapped(),
        session: req.session,
      });
    }
  },

  processRegister: (req, res) => {
    let errors = validationResult(req);

    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }

    
    if (errors.isEmpty()) {
      let { name, last_name, phone, email, pass } = req.body;
      db.User.create({
        name,
        last_name,
        phone,
        email,
        pass: bcrypt.hashSync(pass, 12),
        avatar: req.file ? req.file.filename : "coffe_default.png",
        rol: 2,
      }).then(() => {
        res.redirect("/user/login");
      });
    } else {
      res.render("register", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },

  userProfile: async(req, res) => {
    
    let user = await db.User.findOne({where: { id: req.session.user.id }});
    
    res.render("userProfile", {
      user: user.dataValues,
    });
  
  },



  userUpdateProfile: async(req, res) => {
    let errors = validationResult(req);

    if(req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      }
      errors.push(image);
    }

    if (errors.isEmpty()) {
      let { name, last_name, email, phone } = req.body;
      if(req.file){
        await db.User.update(
          {
            name,
            last_name,
            email,
            phone,
            avatar: req.file.filename,
          },
          {
            where: {
              id: req.session.user.id,
            },
          }
        );
      } else {
        await db.User.update(
          {
            name,
            last_name,
            email,
            phone,
          },
          {
            where: {
              id: req.session.user.id,
            },
          }
        );
      }
      req.session.destroy();
      if (req.cookies.user){
        res.cookie('user','',{maxAge:-1});
      }
      res.redirect("/");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    if (req.cookies.userarte_cafe) {
      res.cookie("userArte_cafe", "", { maxAge: -1 });
    }
    res.redirect("/");
  },

  userDelete: (req,res) => {
    req.session.destroy();
    if (req.cookies.user){
      res.cookie('user','',{maxAge:-1});
    } 
    db.User.destroy({
      where:{
        id : req.params.id
      }
    })
    res.redirect('/') 
  },

  userChangePasswordForm: async(req, res) => {
    
    res.render("userChagePassword", {
      session: req.session,
    });
  },

  userChangePassword: async(req, res) => {

    let errors = validationResult(req);
    
    if(errors.isEmpty()){
      
      let { pass } = req.body;

      await db.User.update(
        {
          pass: bcrypt.hashSync(pass, 12),
        },
        {
          where: {
            id: req.session.user.id,
          }
        }
      )

      req.session.destroy();
      if (req.cookies.userarte_cafe) {
        res.cookie("userArte_cafe", "", { maxAge: -1 });
      }
      res.redirect("/");

    } else {

      res.render("userChagePassword", {
        errors: errors.mapped(),
        session: req.session,
      });

    }

  }

}