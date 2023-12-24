const { generateAccessToken } = require('../auth/generateTokens');
const getTokenFromHeaeder = require('../auth/getTokenFromHeaeder');
const { verifyRefreshToken } = require('../auth/verifyTokens');
const { jsonResponse } = require('../lib/jsonResponse');
const Token = require('../schema/token');
const router = require('express').Router();

router.post("/", async (req, res)=>{
    const refreshToken = getTokenFromHeaeder (req.headers);

    if(refreshToken) {
        try {
            const found = await Token.findOne({token: refreshToken});
            if(!found) {
                return res
                    .status(401)
                    .send(jsonResponse(401, { error: "Unauthorized"}));
                }

                const payload = verifyRefreshToken(found.token);
                if(payload){
                    const accessToken = generateAccessToken(payload.user);

                    return res.status(200).json(jsonResponse(200, { accessToken: accessToken}));
                } else {
                    return res
                        .status(200)
                        .send(jsonResponse(401, { error: "Unauthorized"}));
                }
        } catch (error) {
        }
    } else {
        
    }

    res.send("refresh token");
});

module.exports = router;