const suppliersRepository = require("./Suppliers.repository")


const createSupplier = async(supplierName,contactNumber) =>
{
   const createSupplier = await suppliersRepository.createSupplier(supplierName,contactNumber)
   return createSupplier
}

async function  deleteSupplier(id) {
  let getSupplierById = await suppliersRepository.getSupplierById(id);
   if (!getSupplierById) {
      throw new Error("Supplier Not Found");
    }

    
  const deletedSupplier = await suppliersRepository.deleteSupplier(id);
  if (!deletedSupplier) throw new Error('Supplier not found.');
  return deletedSupplier
}

async function updateSupplier(id,newData)
{
 let getSupplierById = await suppliersRepository.getSupplierById(id);
   if (!getSupplierById) {
      throw new Error("Supplier Not Found");
    }
    console.log(getSupplierById)
  
  Object.assign(getSupplierById,newData)
  console.log(newData)
  console.log(getSupplierById)
const updatedSupplier = await suppliersRepository.updateSupplier(id,getSupplierById);
 if (!updatedSupplier) throw new Error('error in update ');
  return updatedSupplier

}  

async function getAllSupplier(){
  const getAllSuppliers = await suppliersRepository.getAllSuppliers()
  if (getAllSuppliers.length==0) {
    throw new Error("there is no Suppliers yet");
  }
  console.log(getAllSuppliers)
  return getAllSuppliers
}

module.exports={getAllSupplier,updateSupplier,deleteSupplier,createSupplier}