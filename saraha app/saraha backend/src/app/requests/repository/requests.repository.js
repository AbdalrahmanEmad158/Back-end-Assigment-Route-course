import { RequestStatusEnum } from "../../../lib/enums/requestStatus.enum.js";
import { RequestModel } from "../model/requests.model.js";

export async function createIdentityRequest(requestData) {
  return await RequestModel.create(requestData);
}

export async function getIdentityRequestByMessageId(messageId) {
  return await RequestModel.findOne({ messageId });
}

export async function getIdentityRequestsBySenderId(senderId) {
  return await RequestModel.find({
    sender: senderId,
    status: RequestStatusEnum.PENDING,
  })
    .populate({
      path: "messageId",
      select: "content createdAt",
    })
    .populate({
      path: "requester",
      select: "firstName lastName email",
    });
}

export async function getIdentityRequestsById(requestId) {
  return await RequestModel.findById(requestId);
}

export async function updateIdentityRequestStatus({
  senderId,
  requestId,
  status,
}) {
  return await RequestModel.findOneAndUpdate(
    {
      _id: requestId,
      sender: senderId,
      status: RequestStatusEnum.PENDING,
    },
    {
      $set: { status },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}