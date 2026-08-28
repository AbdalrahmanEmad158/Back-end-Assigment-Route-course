const{Router}=require("express")
const salesRoter= Router()
const salesController = require("./Sales.controller")

salesRoter.post('',salesController.createSale)



salesRoter.get('',salesController.getAllSales)
salesRoter.get('/product/:id',salesController.getSpecificSales)

module.exports =salesRoter
