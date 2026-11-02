import * as RequestService from "../service/requests.service.js";
import validateBody from "../../../lib/validation/validation.js";
import { createRequestDto, acceptRequestDto } from "../dto/requests.dto.js";

export const createIdentityRequest = async (req, res, next) => {
  try {
    const { messageId } = validateBody(createRequestDto, req.params);
    const requester = req.user?.id || req.user?._id;

    const request = await RequestService.createIdentityRequest({
      messageId,
      requester,
    });

    res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: request,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllIdentityRequests = async (req, res, next) => {
  try {
    const senderId = req.user?.id || req.user?._id;
    const requests = await RequestService.getAllIdentityRequests(senderId);

    res.status(200).json({
      success: true,
      message: "Requests retrieved successfully",
      data: requests,
    });
  } catch (err) {
    next(err);
  }
};

export const acceptIdentityRequest = async (req, res, next) => {
  try {
    const { requestId } = validateBody(acceptRequestDto, req.params);
    const senderId = req.user?.id || req.user?._id;

    const updatedRequest = await RequestService.acceptIdentityRequest(senderId, requestId);

    res.status(200).json({
      success: true,
      message: "Request accepted successfully",
      data: updatedRequest,
    });
  } catch (err) {
    next(err);
  }
};