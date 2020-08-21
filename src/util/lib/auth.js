const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

const isLoggedInAsProfesor = (req, res, next)=>{
    if (req.user.Rol_idRol == "1") {
        console.log('works profesor');
        return next();
    }
    return res.redirect('/login');
}

const isLoggedInAsEstudiante = (req, res, next)=>{
    if (req.user.Rol_idRol == "2") {
        console.log('works estudiante');
        return next();
    }
    return res.redirect('/login');
}

const isLoggedInAsAdmin = (req, res, next)=>{
    if (req.user.Rol_idRol == "3") {
        console.log('works admin');
        return next();
    }
    return res.redirect('/login');
}
module.exports = {
    isLoggedIn,
    isLoggedInAsProfesor,
    isLoggedInAsEstudiante,
    isLoggedInAsAdmin
};