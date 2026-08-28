const salesRepository = require("./Sales.repository")
const productRepository = require("../Products/Products.repository")
const productServices = require("../Products/Products.service")



const createSale = async(productId,quantitySold) =>
{

 console.log(productId,quantitySold)
   let getProductById = await productRepository.getProductById(productId);
     if (!getProductById) {
          
        throw new Error("Product Not Found");
    
      }
    

        if (getProductById.stockquantity<quantitySold) {
        throw new Error("Not enough stock");
      }

const createSale = await salesRepository.createSale(productId,quantitySold)
const stockquantity = getProductById.stockquantity-quantitySold
const updateProductQyuantity = await productServices.updateProduct(productId,{stockquantity})
return createSale   
}





async function getAllSales(){
  const getAllSales = await salesRepository.getAllSales()
  if (!getAllSales) {
    throw new Error("there is no sales yet");
  }
  console.log(getAllSales)
  return getAllSales
}


async function getSpecificSaleByProductId(ProductId){
  const getSpecificSaleByProductId = await salesRepository.getSalesByProductId(ProductId)
  if (getSpecificSaleByProductId.length==0) {
    throw new Error("there is no sales for this product yet");
  }
  console.log(getSpecificSaleByProductId)
  return getSpecificSaleByProductId
}

module.exports={getAllSales,getSpecificSaleByProductId,createSale}