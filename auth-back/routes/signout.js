const express = require("express");
const router = express.Router();
const Token = require("../schema/token");
const getTokenFromHeaeder = require("../auth/getTokenFromHeaeder");
const { jsonResponse } = require("../lib/jsonResponse");

router.delete("/", async function (req, res, next) {
    try {
        const refreshToken = getTokenFromHeaeder(req.headers);

        if(refreshToken){
            await Token.findOneAndDelete({ token: refreshToken });
            res.status(200).json(jsonResponse(200, {message: 'Token removed successfully'}));
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, {error: "Server error"}));
    }
});

module.exports = router;