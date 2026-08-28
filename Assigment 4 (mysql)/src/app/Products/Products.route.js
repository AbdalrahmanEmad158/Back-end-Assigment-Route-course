const{Router}=require("express")
const productsRoter= Router()
const productsController = require("./Products.controller")

productsRoter.post('',productsController.createProduct)
productsRoter.delete('/:id',productsController.deleteProduct)

productsRoter.put('/:id',productsController.updateProduct)
productsRoter.get('',productsController.getAllProducts)
productsRoter.get('/:id',productsController.getSpecificProduct)
module.exports = productsRoter
