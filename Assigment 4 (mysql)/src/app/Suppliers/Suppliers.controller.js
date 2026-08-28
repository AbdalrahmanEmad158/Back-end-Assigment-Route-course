const supplierServices = require("./Suppliers.service")


const createSuppliers = async (req,res,next)=>{
  try {
      const{supplierName,contactNumber}=req.body
    
    const createSupplier = await supplierServices.createSupplier(supplierName,contactNumber)
    res.status(201).json({msg :"Supplier created successful",date :createSupplier })
  } catch (error) {
    next(error)
  }
}


const  deleteSupplier = async (req,res,next)=>{
  try {
    const {id} = req.params
    
    const deleteSupplier = await supplierServices.deleteSupplier(id)
    res.status(200).json({msg :"Supplier deleted successful",date :deleteSupplier })
  } catch (error) {
    next(error)
  }
}





async function updateSupplier(req, res, next) {
  try {
    const { id } = req.params;

    const updatedSupplier = await supplierServices.updateSupplier(id,req.body);
    res.status(200).json({
      message: "Supplier updated successfully",
      success: true,
      data: updatedSupplier
    });
  } catch (err) {
    next(err);
  }
}


async function getAllSupplier(req, res, next) {
  try {
   

    const getAllSupplier = await supplierServices.getAllSupplier();
    res.status(200).json({
      message: "All Supplier",
      success: true,
      data:getAllSupplier
    });
  } catch (err) {
    next(err);
  }
}

module.exports={getAllSupplier,createSuppliers,deleteSupplier, updateSupplier}