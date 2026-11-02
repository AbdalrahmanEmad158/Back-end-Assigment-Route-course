import {AppError} from "../../pkg/error/error.js";

const RequestError = {
  requestNotFound: () =>
    new AppError("request not found", 404),



  requestAlreadyExists: () =>
    new AppError("Identity request already exists", 409),

  requestAlreadyProcessed: () =>
    new AppError("Identity request has already been processed", 409),

  invalidRequestStatus: () =>
    new AppError("Invalid identity request status", 400),

  cannotRequestOwnIdentity: () =>
    new AppError("You cannot request your own identity", 400),

  unauthorized: () =>
    new AppError("You are not authorized to perform this action", 403),
};

export default RequestError;