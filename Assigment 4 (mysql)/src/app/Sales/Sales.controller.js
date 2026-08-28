const salesServices = require("./Sales.service")



const createSale = async (req,res,next)=>{
  try {
      const{productId,quantitySold} = req.body
    
    const createSale = await salesServices.createSale(productId,quantitySold)
    res.status(201).json({msg :"Supplier created successful",date :createSale })
  } catch (error) {
    next(error)
  }
}


async function getAllSales(req, res, next) {
  try {
   

    const getAllSales = await salesServices.getAllSales();
    res.status(200).json({
      message: "get All Sales",
      success: true,
      data:getAllSales
    });
  } catch (err) {
    next(err);
  }
}



async function getSpecificSales(req, res, next) {
  try {
   
 const {id} = req.params
    const getSpecificSales = await salesServices.getSpecificSaleByProductId(id);
    res.status(200).json({
      message: "get Specific Sales",
      success: true,
      data:getSpecificSales
    });
  } catch (err) {
    next(err);
  }
}

module.exports={getAllSales,getSpecificSales,createSale}