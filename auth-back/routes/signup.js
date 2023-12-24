const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user');

router.post("/", async (req, res)=>{
    const {username, name, password} = req.body;
    
    if(!!!username || !!!name || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }

    const user = new User({username, name, password});

    await user.save();

    res
    .status(200)
    .json(jsonResponse(200, { message: "User created successfully" }));

    // Move this line outside of the previous block
    res.send("signout");
    });

module.exports = router;