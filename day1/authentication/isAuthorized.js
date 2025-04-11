const isAuthorized = (req, res, next) => {
    const isLogin = false;

    if (isLogin) {
        next()
    } else {
        res.json({
            message: "user is unAuthorized"
        })
    }
}

export default isAuthorized