const validatePostData = (req, res, next) => {
    const { name, description, platforms, background_image, released, rating, genres } = req.body;
    if( !name) {
        return res.status(400).json({ error: 'Please enter a name' });
    } else if (!description) {
        return res.status(400).json({ error: 'Please enter a description' });
    } else if (platforms.length === 0) {
        return res.status(400).json({ error: 'Please enter platforms' });
    } else if (!background_image) {
        return res.status(400).json({ error: 'Please enter a image' });
    } else if (!released) {
        return res.status(400).json({ error: 'Please enter a released date' });
    } else if (!rating) {
        return res.status(400).json({ error: 'Please enter a rating' });
    } else if (!genres) {
        return res.status(400).json({ error: 'Please enter a genre' });
    } else if (genres.length === 0) {
        return res.status(400).json({ error: 'Please enter a genre' });
    }
    next();
};


module.exports={
    validatePostData,
};