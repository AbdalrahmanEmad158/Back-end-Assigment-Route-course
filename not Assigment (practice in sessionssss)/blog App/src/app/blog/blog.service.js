const userRepository = require("../user/user.repository.js")
const blogRepository = require("./blog.repository.js")
const jwt = require('jsonwebtoken')

const createBlog = async(title,content,authorId) =>
{
   return await blogRepository.createBlog(title,content,authorId)
}

async function  hardDeleteBlog(id,authorId) {
  const deletedBlog = await blogRepository.hardDeleteBlog(id, authorId);
  if (!deletedBlog) throw new Error('blog not found.');
}


async function  softDeleteBlog(id,authorId) {
  const deletedBlog = await blogRepository.softDeleteBlog(id, authorId);
  if (!deletedBlog) throw new Error('blog not found.');
return deletedBlog
}

async function restoreBlog(id,authorId) {
  const restoredBlog = await blogRepository.restoreBlog(id, authorId);
 console.log("restoreee "+restoredBlog)
  return restoredBlog;
}

async function updateBlog(id,newData)
{
 let blogExist = await blogRepository.getBlogById(id);
   if (!blogExist) {
      throw new Error("blog Not Found");
    }
  
  Object.assign(blogExist,newData)
const updatedBlog = await blogRepository.updateBlog(id,blogExist);
return updatedBlog;

}  

async function getBlogs(){
  const blogs = await blogRepository.getAllBlogs()
  if (!blogs) {
    throw new Error("there is no blogs yet");
  }
  console.log(blogs)
  return blogs
}

module.exports={getBlogs,createBlog, hardDeleteBlog,
  softDeleteBlog,restoreBlog,updateBlog,updateBlog}