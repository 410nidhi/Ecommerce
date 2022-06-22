// Creting Token and sanving in Cookie

const sendToken = (user, statusCode, res)=>{

    const token = user.getJWTToken()

    // Options for Cookie
    const CookieExp = 5;
    const options = {
        expires: new Date(Date.now() + CookieExp * 24 * 60 * 60 *1000),
        httpOnly: true,
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    })
}

module.exports = sendToken