import * as commentServices from "./comment.service.js";
const createManyComments = async (req, res, next) => {

    try{
        const data = req.body;
        const comments = await commentServices.createManyComments(data);
        res.status(201).json({
            success: true,
            message: "comments created successfully",
            data :comments,
        });
    }
    catch (error) {
        next(error);
    }
}

const updateContent = async (req, res, next) => {
    try{
        let { content, userId } = req.body;   
        let commentId  = Number(req.params.commentId);
        userId = Number(userId);
        content = String(content);
         commentId = Number(commentId);
     
        const comment = await commentServices.updateContent(content, commentId, userId);
        res.status(200).json({
            success: true,
            message: "comment updated successfully",
            data :comment,
        });
    }
    catch (error) {
        next(error);
    }
}

const getCommentOrCreate = async (req, res, next) => {
    try{
        const comment = await commentServices.findOrCreate(req.body);
       if(comment.created){
        res.status(201).json({
            success: true,  
            message: "comment created successfully",
            data :comment,
        });
       }
       

        res.status(200).json({
            success: true,
            message: "comment found successfully",
            data :comment,
        });
    }
    catch (error) {
        next(error);
    }
}

async function findByWord(req, res, next) {
  const word = req.query.word;
  try {
    const comments = await commentServices.findByWord(word);
    res.status(200).json({
      comments,
    });
  } catch (err) {
    next(err);
  }
}

async function getLatestComments(req, res, next) {
  const postId = Number(req.params.postId);
  try {
    const comments = await commentServices.getLatestComments(postId);
    res.status(200).json({
      comments,
    });
  } catch (err) {
    next(err);
  }
}

async function findById(req, res, next) {
  const id = Number(req.params.id);
  try {
    const comment = await commentServices.findById(id);
    res.status(200).json({
      comment,
    });
  } catch (err) {
    next(err);
  }
}

export { createManyComments ,updateContent,getCommentOrCreate,findByWord,getLatestComments ,findById};
