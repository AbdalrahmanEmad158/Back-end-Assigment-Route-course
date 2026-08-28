const productsRepository = require("./Products.repository")


const createProduct = async(ProductName,
            Price,
            StockQuantity,
            SupplierID) =>
{
   const createProduct = await productsRepository.createProduct(ProductName,
            Price,
            StockQuantity,
            SupplierID) 
             return createProduct
}

async function  deleteProduct(id) {
  let getProductById = await productsRepository.getProductById(id);
   if (!getProductById) {
      throw new Error("Product Not Found");
    }

    
  const deletedProduct = await productsRepository.deleteProduct(id);
  if (!deletedProduct) throw new Error('error in delete Product');
  return deletedProduct
}

async function updateProduct(id, newData) {
    let getProductById =
        await productsRepository.getProductById(id);

    if (!getProductById) {
        throw new Error("Product Not Found");
    }

    console.log("BEFORE:", getProductById);
    console.log("NEWDATA:", newData);

    Object.assign(getProductById, newData);

    console.log("AFTER:", getProductById);

    const updatedProduct =
        await productsRepository.updateProduct(id, getProductById);

    console.log("UPDATED:", updatedProduct);

    if (!updatedProduct) {
        throw new Error("error in update Product");
    }

    return updatedProduct;
} 

async function getAllProducts(){
  const getAllProducts = await productsRepository.getAllProducts()
  if (getAllProducts.length==0) {
    throw new Error("there is no Products yet");
  }
  console.log(getAllProducts)
  return getAllProducts
}


async function getspecificProduct(id){
 let getProductById = await productsRepository.getProductById(id);
   if (!getProductById) {
      throw new Error(" Product Not Found");
    }
    console.log(getProductById)
    return getProductById
}

module.exports={getspecificProduct,getAllProducts,deleteProduct,createProduct,updateProduct}