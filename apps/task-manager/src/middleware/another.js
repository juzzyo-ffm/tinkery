const another = async (req, res, next) => {
    console.log('another middleware');
    next();
};


module.exports = another;