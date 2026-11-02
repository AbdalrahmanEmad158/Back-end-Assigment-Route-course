import * as messageRepo from "../../message/repository/message.repository.js";
import RequestError from "../errors.js";
import * as messageError from "../../message/errors.js";
import * as requestRepo from "../repository/requests.repository.js";
import * as userRepo from "../../user/repository/user.repository.js";
import * as userError from "../../user/errors.js";
import { RequestStatusEnum } from "../../../lib/enums/requestStatus.enum.js";
import { AppError } from "../../../pkg/error/error.js";

export const createIdentityRequest = async (requestData) => {
  const messageExist = await messageRepo.getMessageById(requestData.messageId);

  if (!messageExist) {
    throw messageError.messageNotFound;
  }

  if (requestData.requester.toString() !== messageExist.reciver.toString()) {
    throw RequestError.unauthorized();
  }

  if (!messageExist.sender) {
    throw new AppError("Cannot request identity for an anonymous guest sender", 400);
  }

  if (messageExist.sender.toString() === requestData.requester.toString()) {
    throw RequestError.cannotRequestOwnIdentity();
  }

  const requestExist = await requestRepo.getIdentityRequestByMessageId(
    requestData.messageId,
  );

  if (requestExist) {
    throw RequestError.requestAlreadyExists();
  }

  return await requestRepo.createIdentityRequest({
    messageId: messageExist._id,
    requester: requestData.requester,
    sender: messageExist.sender,
  });
};

export const getAllIdentityRequests = async (senderId) => {
  const userExist = await userRepo.getUserById(senderId);
  if (!userExist) {
    throw userError.userNotExist;
  }

  const requests = await requestRepo.getIdentityRequestsBySenderId(senderId);
  return requests;
};

export const acceptIdentityRequest = async (senderId, requestId) => {
  const senderExist = await userRepo.getUserById(senderId);
  if (!senderExist) {
    throw userError.userNotExist;
  }

  const request = await requestRepo.getIdentityRequestsById(requestId);
  if (!request) {
    throw RequestError.requestNotFound();
  }

  if (request.sender.toString() !== senderId.toString()) {
    throw RequestError.unauthorized();
  }

  if (request.status !== RequestStatusEnum.PENDING) {
    throw RequestError.requestAlreadyProcessed();
  }

  return await requestRepo.updateIdentityRequestStatus({
    requestId,
    senderId,
    status: RequestStatusEnum.ACCEPTED,
  });
};