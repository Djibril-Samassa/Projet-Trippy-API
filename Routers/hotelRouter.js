const express =  require("express");
const Joi = require("joi");
const Router = express.Router();

/* Vérification pour chaque ajout d'hotel*/
const addHotel = Joi.object({
	name: 	Joi.string()
			.required(),
	adress: Joi.string()
			.required(),
	city: 	Joi.string()
			.required(),
	country: Joi.string()
			.required(),
	stars: Joi.number()
			.min(1)
			.max(5)
			.required(),
	hasSpa: Joi.boolean()
			.required(),
	hasPool: Joi.boolean()
			.required(),
	priceCategory: Joi.number()
			.min(1)
			.max(3)
			.required(),

})

const hotels = [
	{
		"id": 1,
		"name": "Imperial Hotel",
		"address": "84 av des Champs-Élysées",
		"city": "Paris",
		"country": "France",
		"stars": 5,
		"hasSpa": true,
		"hasPool": true,
		"priceCategory": 3
	},
	{
		"id": 2,
		"name": "The Queen",
		"address": "3 Darwin Street",
		"city": "London",
		"country": "England",
		"stars": 4,
		"hasSpa": true,
		"hasPool": false,
		"priceCategory": 3
	},
	{
		"id": 3,
		"name": "Kiwi land",
		"address": "4587 George St.",
		"city": "Auckland",
		"country": "New-Zealand",
		"stars": 3,
		"hasSpa": false,
		"hasPool": true,
		"priceCategory": 2
	}
]

Router.get("/", (req,res) =>{
	res.send(hotels);
})

/* Chercher un hotel grâce à son identifiant */
Router.get("/:id", (req,res) =>{
	const id = hotels.find((ident) =>{
		return ident.id.toString() === req.params.id;
	})
	res.send(id)
})

/*Ajouter un hotel*/
Router.post("/", (req,res) =>{
	var hotel = req.body;
	// req.body.id = hotels.length + 1;
	const validateHotel = addHotel.validate(hotel);
	if(validateHotel.error){
		return res.status(400).json({
			message: validateHotel.error
		})
	}
	hotels.push(hotel)
	res.send(hotels)
})

/*Modifier coordonnées d'un hôtel*/
Router.patch("/:id",(req,res) =>{
	let id = hotels.find((ident) =>{
		return ident.id.toString() === req.params.id;
	})
	id.name = req.body.name
	res.send(id)
});

Router.delete("/:id",(req,res) =>{
	id = req.params.id - 1;
	hotels.splice(id, 1);
	res.send(hotels)
})

/*Export du router vers l'index*/
module.exports = Router;