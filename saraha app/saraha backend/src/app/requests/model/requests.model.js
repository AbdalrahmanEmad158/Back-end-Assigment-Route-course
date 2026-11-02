import { model, Schema } from 'mongoose';
import { RequestStatusEnum } from '../../../lib/enums/requestStatus.enum.js';

const schema = new Schema({
  messageId: { type: Schema.Types.ObjectId, ref: "Message" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  requester: { type: Schema.Types.ObjectId, ref: "User" },
 
    status: {
      type: String,
      enum: Object.values(RequestStatusEnum),
      default: RequestStatusEnum.PENDING,
    },
}, {
  timestamps: true
});

export const RequestModel = model('RequestModel', schema);

// decline:
// receiver-Of-Req authorized
// update request-doc status to reject with its id.

// accept:
// receiver-Of-Req authorized
// update request-doc status to accept with its id
// create a conversation between sender and reciver
