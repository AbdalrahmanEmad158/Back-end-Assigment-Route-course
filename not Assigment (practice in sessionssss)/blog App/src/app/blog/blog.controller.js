const blogServices = require("./blog.service")

const createBlog = async (req,res,next)=>{
  try {
      const{title,content}=req.body
      const auther_id = req.user.id
    const createBlog = await blogServices.createBlog(title,content,auther_id)
    res.status(201).json({msg :"blog created successful",date :createBlog })
  } catch (error) {
    next(error)
  }
}


const  hardDeleteBlog = async (req,res,next)=>{
  try {
    const {id} = req.params
        const auther_id = req.user.id
    const deleteBlog = await blogServices.hardDeleteBlog(id,auther_id)
    res.status(201).json({msg :"blog deleted successful",date :deleteBlog })
  } catch (error) {
    next(error)
  }
}

const  softDeleteBlog = async (req,res,next)=>{
  try {
    const {id} = req.params
        const auther_id = req.user.id
    const deleteBlog = await blogServices.softDeleteBlog(id,auther_id)
    res.status(201).json({msg :"blog deleted successful",date :deleteBlog })
  } catch (error) {
    next(error)
  }
}

async function restoreBlog(req, res, next) {
  try {
    const { id } = req.params;
       const auther_id = req.user.id
    const restoredBlog = await blogServices.restoreBlog(id,auther_id);
    res.status(200).json({
      message: "Blog restore successfully",
      success: true,
      data: restoredBlog
    });
  } catch (err) {
    next(err);
  }
}

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;

    const updatedBlog = await blogServices.updateBlog(id,req.body);
    res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      data: updatedBlog
    });
  } catch (err) {
    next(err);
  }
}


async function getAllBlogs(req, res, next) {
  try {
   

    const allBlogs = await blogServices.getBlogs();
    res.status(200).json({
      message: "All Blogs",
      success: true,
      data:allBlogs
    });
  } catch (err) {
    next(err);
  }
}

module.exports={getAllBlogs,createBlog, hardDeleteBlog,softDeleteBlog,
  restoreBlog, updateBlog}