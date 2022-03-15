const express = require("express");
const app = express();
const Joi = require("joi");
const Router = express.Router();

/* Vérification pour chaque ajout d'un restaurant*/
const addRestaurant = Joi.object({
	name: 	Joi.string()
			.required(),
	address: Joi.string()
			.required(),
	city: 	Joi.string()
			.required(),
	country: Joi.string()
			.required(),
	stars: Joi.number()
			.min(1)
			.max(5)
			.required(),
	cuisine: Joi.string()
			.required(),
	priceCategory: Joi.number()
			.min(1)
			.max(3)
			.required(),

})

const restaurants = [
	{
		"id": 1,
		"name": "Les trois Mousquetaires",
		"address": "22 av des Champs-Élysées",
		"city": "Paris",
		"country": "France",
		"stars": 4,
		"cuisine": "french",
		"priceCategory": 3
	},
	{
		"id": 2,
		"name": "The Fat Guy",
		"address": "47 Jackson Boulevard",
		"city": "New York",
		"country": "US",
		"stars": 5,
		"cuisine": "burger",
		"priceCategory": 1
	},
	{
		"id": 3,
		"name": "Veggies",
		"address": "77 Avenir Street",
		"city": "Sydney",
		"country": "Australia",
		"stars": 5,
		"cuisine": "vegan",
		"priceCategory": 2
	}
]

/*Afficher la liste des restaurants*/
Router.get("/", (req, res) =>{ 
	/* Verifier si l'utilisateur cherche selon un critère*/
		if(req.query = {}){
			res.send(restaurants)
		}
		else{
			
		}
	/* Chercher par catégorie de prix*/

})

/*Afficher un restaurant grâce à l'id*/
Router.get("/:id", (req,res) =>{
	const id = restaurants.find((restau) =>{
		return restau.id.toString() === req.params.id
	})
	res.send(id)
})

/*Ajouter un restaurant*/
Router.post("/", (req,res) =>{
	var Restaurant = req.body;
	const validateRestaurant = addRestaurant.validate(Restaurant);
	if(validateRestaurant.error){
		return res.status(400).json({
			message: validateRestaurant.error
		})
	}
	restaurants.push(Restaurant)
	res.send(restaurants)
})

/*Modifier le nom d'un restaurant*/
Router.patch("/:id",(req,res) =>{
	let id = restaurants.find((ident) =>{
		return ident.id.toString() === req.params.id;
	})
	id.name = req.body.name
	res.send(id)
});

/* Supprimer un restaurant*/
Router.delete("/:id",(req,res) =>{
	id = req.params.id - 1;
	restaurants.splice(id, 1);
	res.send(restaurants)
})


module.exports = Router;