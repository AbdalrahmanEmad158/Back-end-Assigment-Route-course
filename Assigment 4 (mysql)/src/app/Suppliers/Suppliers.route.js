const{Router}=require("express")
const suppliersRoter= Router()
const suppliersController = require("./Suppliers.controller")

suppliersRoter.post('',suppliersController.createSuppliers)
suppliersRoter.delete('/:id',suppliersController.deleteSupplier)

suppliersRoter.put('/:id',suppliersController.updateSupplier)
suppliersRoter.get('',suppliersController.getAllSupplier)
module.exports =suppliersRoter
