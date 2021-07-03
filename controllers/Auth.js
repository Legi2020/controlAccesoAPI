const validarApiKey = (req, res, next) => {
    key = req.headers.apikey;
    
    if(key != process.env.API_KEY){
        return res.status(401).json({
            error: true,
            message: 'Sin autorizacion'
        })
    }
    next();
};

module.exports = {
    validarApiKey
}