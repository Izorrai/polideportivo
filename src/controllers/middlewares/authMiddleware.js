
function isAuthenticated(req, res, next) {
   
    const user = req.user || (req.session && req.session.user);
    
    if (user) {
        next();
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'No estas autenticado'
        });
    }
}

function isClient(req, res, next) {
   
    const user = req.user || (req.session && req.session.user);
    
    if (user && user.roles === "CLIENTE") {
        next();
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'No eres un cliente'
        });
    }
}

function isAdmin(req, res, next) {
    console.log('Token decodificado en isAdmin:', req.user);
    
    if (req.user && req.user.roles === "ADMIN") {
        console.log('Acceso ADMIN permitido');
        next();
    } else {
        console.log('Acceso ADMIN denegado. Roles:', req.user ? req.user.roles : 'no user');
        return res.status(401).json({
            status: 'error',
            message: 'No eres administrativo'
        });
    }
}





function adminOMismoId(req, res, next) {
    const id = req.params.id;
    
    const user = req.user || (req.session && req.session.user);
    
    if (user && (user.roles === "ADMIN" || user.cliente_id == id)) {
        next();
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'No eres ni administrativo ni cliente'
        });
    }
}

export {
    isAuthenticated,
    isClient,
    isAdmin,
    adminOMismoId
}