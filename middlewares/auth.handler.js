const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkCookie(req, res, next) {//verificamos si en las peticiones viene la cookie.
  const cookie = req.cookies?.authToken;
  if (cookie) {
    //req.session = {user:null};
    //req.session.user = cookie.user
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

function checkAdminRole(req, res, next) {
    const user = req.user;
    if (user.role === 'admin') {
      next();
    } else {
      next(boom.unauthorized());
    }
  }

  //valida que el usuario logeado corresponde a los role spermitidos como parametos
  function checkRoles( ...roles) {

    return (req,res,next) => {  
        //console.log(roles);
        const user = req.user;
        console.log(user)
        if (roles.includes(user.role)) {
          next();
        } else {
          next(boom.unauthorized('only admin user can create a record on config'));
        }
    
     }  
  }

module.exports = { checkApiKey,checkAdminRole,checkRoles, checkCookie };