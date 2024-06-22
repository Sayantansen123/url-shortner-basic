const express = require("express");
const path = require('path');
const app = express();
const URL = require("./models/url")
const urlRoute = require("./routes/url")
const { connectToMongoDB } = require("./connect")
const staticRoute = require("./routes/staticrouter")

connectToMongoDB("mongodb://127.0.0.1:27017/shoer-url").then(() => console.log("MongoDb connected"))
app.use(express.json());//parsing middleware
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use("/url", urlRoute);

app.use("/",staticRoute);


app.get('/url/:ids', async (req, res) => {
    const ids = req.params.ids;
    const entry = await URL.findOneAndUpdate({
        ids
    }, {
        $push: {
            visitHistory: [{ timestamp:  Date.now() }],
        }
    }
    );
    res.redirect(entry.redirectURL)
})

app.listen(8001, () => console.log('Server started at port : 8001'))