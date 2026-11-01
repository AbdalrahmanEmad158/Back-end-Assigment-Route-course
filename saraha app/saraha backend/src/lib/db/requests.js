import { model, Schema } from 'mongoose';

const schema = new Schema({
  messageId: { type: Schema.Types.ObjectId, ref: "Message" },
  senderOfReq: { type: Schema.Types.ObjectId, ref: "User" },
  receiverOfReq: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accept", "decline"],
    default: "pending"
  }
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
