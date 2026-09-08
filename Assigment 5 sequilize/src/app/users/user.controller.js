import * as userService from "./user.service.js";
async function signup(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const id = Number(req.params.id);

  try {
    const user = await userService.updateUser(req.body, id);
    res.status(200).json({
      message: "user created or updated successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function findByEmail(req, res, next) {
  const { email } = req.query;
  try {
    const user = await userService.findByEmail(email);
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
}

async function findById(req, res, next) {
  const id = Number(req.params.id);
  try {
    const user = await userService.findById(id);
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
}

export { signup, update, findByEmail , findById };