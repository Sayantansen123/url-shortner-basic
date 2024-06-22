
const URL = require('../models/url');


function generateRandomString() {
    const length = 8;
    const chars = 'ABCDEFGHIJKLMNOPQRSTuvwx123478'
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).render("home",{
        sid: "Please enter your url"
    })

    const shortID = generateRandomString();
    const obj = {

        ids: shortID,
        redirectURL: body.url,
        visitHistory: []

    }
    console.log(obj);
    await URL.create(
        obj
    );
    return res.render("home",{
        id: shortID 
    })
    
    
}

async function handleGetAnalytics(req, res) {
    const ids = req.params.ids;
    const result = await URL.findOne({ ids });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });

}

module.exports =
{
    handleGenerateNewShortURL,
    handleGetAnalytics,
}