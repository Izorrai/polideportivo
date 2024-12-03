

function isAuthenticated(req,res,next){
    console.log(req.session);
    if(req.session.user){
        next();
    }else{
        res.redirect("/login")
    }
}

function isClient(req,res,next){
    if(req.session.user && req.session.user.roles==="CLIENT"){
        next();
    }else{
        res.redirect("/login")
    }
}

function isAdmin(req,res,next){
    if(req.session.user && req.session.user.roles==="ADMIN"){
        next();
    }else{
        res.redirect("/login")
    }
}

function adminOMismoId(req,res,next){
    const id = req.params.id;
    if(req.session.user && (req.session.user.roles==="ADMIN" || req.session.user.usuario_id==id)){
        next();
    }else{
        res.redirect("/login")
    }
}



export {
    isAuthenticated,
    isClient,
    isAdmin,
    adminOMismoId
}