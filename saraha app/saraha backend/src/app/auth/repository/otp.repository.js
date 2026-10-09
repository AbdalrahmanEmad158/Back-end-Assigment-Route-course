import {Otp} from "../../auth/model/otp.model.js"

export async function createOtp(otpData)
{
 const otp =   await Otp.create(otpData)
 return otp
}

export async function getOtpByEmail(email)
{
 const otp =   await Otp.findOne({email})
 return otp
}

export async function deleteOtpByEmail(email)
{
 const otp =   await Otp.deleteMany({email})
 return otp
}