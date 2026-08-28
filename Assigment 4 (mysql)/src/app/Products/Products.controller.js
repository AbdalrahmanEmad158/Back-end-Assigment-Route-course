const productServices = require("./Products.service")


const createProduct = async (req,res,next)=>{
  try {
      const{ProductName,
            Price,
            StockQuantity,
            SupplierID}=req.body
    
    const createProduct = await productServices.createProduct(ProductName,
            Price,
            StockQuantity,
            SupplierID)
    res.status(201).json({msg :"Product created successful",date :createProduct })
  } catch (error) {
    next(error)
  }
}


const  deleteProduct = async (req,res,next)=>{
  try {
    const {id} = req.params
    
    const deleteProduct = await productServices.deleteProduct(id)
    res.status(200).json({msg :"Product deleted successful",date :deleteProduct })
  } catch (error) {
    next(error)
  }
}





async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    const updatedProduct = await productServices.updateProduct(id,req.body);
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct
    });
  } catch (err) {
    next(err);
  }
}


async function getAllProducts(req, res, next) {
  try {
   

    const getAllProducts = await productServices.getAllProducts();
    res.status(200).json({
      message: "All Product",
      success: true,
      data:getAllProducts
    });
  } catch (err) {
    next(err);
  }
}

const  getSpecificProduct = async (req,res,next)=>{
  try {
    const {id} = req.params
    
    const getSpecificProduct= await productServices.getspecificProduct(id)
    res.status(200).json({msg :"get Product successful",date :getSpecificProduct })
  } catch (error) {
    next(error)
  }
}

module.exports={getSpecificProduct,createProduct,deleteProduct,updateProduct,getAllProducts}