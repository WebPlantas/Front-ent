const isLoggedIn = async (req, res, next) => {
    if (await req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

const isLoggedInAsProfesor = async(req, res, next)=>{
    if ( await req.isAuthenticated() && req.user.Rol_idRol == "1") {
        console.log('works profesor');
        return next();
    }
    return res.redirect('/login');
}

const isLoggedInAsEstudiante = async (req, res, next)=>{
    if (await req.isAuthenticated() && req.user.Rol_idRol == "2") {
        console.log('works estudiante');
        return next();
    }
    return res.redirect('/login');
}

const isLoggedInAsAdmin = async (req, res, next)=>{
    if (await req.isAuthenticated() && req.user.Rol_idRol == "3") {
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