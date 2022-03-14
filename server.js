const express = require("express");
const app = express();
const hotelRouter = require("./Routers/hotelRouter");
const restaurantRouter = require("./Routers/restaurantRouter");

app.use(express.json());
app.use("/hotels", hotelRouter);
app.use("/restaurants", restaurantRouter);

app.get("/", (req,res) =>{
    res.send("Bienvenue sur Trippy API")
})

app.get("*", (_req, res) => {
	res.status(404).send("Error 404 not found");
});

app.listen(8000, ()=>{
    console.log("listening");
})

