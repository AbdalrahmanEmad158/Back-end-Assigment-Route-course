import  jwt  from "jsonwebtoken";
import { cacheProvider } from "../../../lib/cache/init";
import { env } from "../../../lib/confiq/env";
import { initnodemailer } from "../../../lib/email/init";
import { AppError } from "../../../lib/error/error";
import { verifyGoogleToken } from "../../../lib/utils/google-auth";
import { generateOTPCode } from "../../../lib/utils/otp";
import { MailProvider } from "../../../pkg/email/mail.interface";
import { toSecounds } from "../../../pkg/utils/time";
import { userAlreadyExist, userAlreadyVerified, userNotExist, userNotVerified } from "../../user/errors";
import userRepository, { UserRepository } from "../../user/repository/user.repository";
import { RegisterDto,LoginDto,SendOtpDto ,VerifyAccountDto, Enable2StepVerificationDto, VerifyCodeActiveTwoStepVerificationDto, VerifyCodeTwoStepVerificationDto   } from "../dto/dto";
import { providerEnums } from "../enums/enums";
import { invalidCode, invalidPassword, otpExpired } from "../errors";
import { comparePassword, generateAccessToken, generateRefreshToken, hashPassword } from "../utils";
import { TUserPayload } from "../../../lib/interface/userPayload.interface";

export class AuthService {
  private twoStepVerificationKey: string = '2-step-verification:';
  private sendOtpKey: string = 'otp:';
  private readonly userRepository: UserRepository = userRepository;
  private readonly mailProvider : MailProvider

    constructor() {
        this.mailProvider = initnodemailer
    }

    register =async(registerDto : RegisterDto) =>{
  // 1. check user existence
const userExist = await this.userRepository.findByEmail(registerDto.email);
// 2. if yes, throw an error.
if (userExist) throw userAlreadyExist;
// 3. prepare data [hash-password]
registerDto.password = await hashPassword(registerDto.password);
// 4. save user into DB -> isVerified: false
const createUser = await this.userRepository.create(registerDto);
// 5.generate and save otp into DB
const code = generateOTPCode();

// logger.info(code);
// await otpRepository.createOTP({
//   code: code,
//   email: userData.email, 
//   expiresAt: new Date(Date.now() + toMs(5, 'minutes')),
// });
await cacheProvider.set(
  `${this.sendOtpKey}${createUser._id.toString()}`,
  code,
  toSecounds( 3,  'm')
);
// 6. send email verification OTP
await this.mailProvider.sendEmail(
  registerDto.email,
   'verification code' ,
  `<h1>Your verification code is ${code}</h1>` 
);
   return createUser;
  }

 verifyAccount =async(verifyAccountDto :VerifyAccountDto ) =>{
  // 1. check user existence
const user = await this.userRepository.findByEmail(verifyAccountDto.email);
// 1.1 if not exist >> error "User not exist."
if (!user) throw userNotExist;
// 1.2 if isVerified = true >> error "You already verified"
if (user.isVerified === true) throw userAlreadyVerified;
// 2. check otp validation
const cacheCode: string | null = await cacheProvider.get(
  `${this.sendOtpKey}${user._id.toString()}`
);
// 2.1 not exist into DB >> error >> "otp expired" >> resend otp
if (!cacheCode) throw otpExpired;
// 2.2 otp stored into DB >> code not equal code stored >> error >> 'Invalid otp'
if (cacheCode !== verifyAccountDto.code) throw invalidCode;
// 3. Switch your isVerified to true [update user]
const updatedUser = await this.userRepository.update(
  {email: verifyAccountDto.email},
  {isVerified: true},
  {new:true}
);
// 4. delete otp from DB
await cacheProvider.del(`${this.sendOtpKey}${user._id.toString()}`);

return updatedUser;
  }

  enable2StepVerification= async(enable2StepVerificationDto:Enable2StepVerificationDto) =>{
  const code = generateOTPCode();
  await cacheProvider.set(`${this.twoStepVerificationKey}${enable2StepVerificationDto.email}`, code, toSecounds( 3,  'm' ));
  await this.mailProvider.sendEmail(enable2StepVerificationDto.email, '2 step verification code', `your 2 step verification code is ${code}`);
}

verifyCodeActiveTwoStepVerification= async (verifyCodeActiveTwoStepVerificationDto:VerifyCodeActiveTwoStepVerificationDto)=> {
  // 1. check user existence
  const user: any = await userRepository.findByEmail(verifyCodeActiveTwoStepVerificationDto.email); // {} | null
  // 1.1 if you don't exist >> error "User not exist."
  if (!user) throw userNotExist;
  console.log(`${this.twoStepVerificationKey}${verifyCodeActiveTwoStepVerificationDto.email}`);

  // 2. check otp validation
  // const otp = await otpRepository.getOtpbyEmail(email); // {code,email} | null
  const cacheCode: string | null = await cacheProvider.get(
    `${this.twoStepVerificationKey}${verifyCodeActiveTwoStepVerificationDto.email}`
  );
  console.log(cacheCode);

  // 2.1 not exist into DB >> error >> "otp expired" >> resend otp
  if (!cacheCode) throw otpExpired;
  // 2.2 otp stored into DB >> code not equal code stored >> error >> 'Invalid otp'
  if (cacheCode !== verifyCodeActiveTwoStepVerificationDto.code) throw invalidCode;
  const updatedUser = await userRepository.update({email:verifyCodeActiveTwoStepVerificationDto.email},{twoStepVerfication: true },{new:true});
return updatedUser
}

login=async(loginDto :LoginDto ) =>{
  const cachedAttempt: string | null = await cacheProvider.get(`${loginDto.email}:login`);
if (cachedAttempt === '0') throw new AppError( 'you reach max tries',  429 );
// 1. check user existence
const user = await userRepository.findByEmail(loginDto.email); // {} | null

// 1.1 not exist
if (!user) throw userNotExist;
// 1.2 not verifiedif (user['isVerified'] === false) throw userNotVerified;
// 2. compare password
const match: boolean = await comparePassword(loginDto.password, user.password);
if (!match) throw invalidPassword;
let code:string =""
if (user.twoStepVerfication === true) {
   code= generateOTPCode();
   await cacheProvider.set(`${this.twoStepVerificationKey}${loginDto.email}`, code, toSecounds(1,'m' ));

   await this.mailProvider.sendEmail(
  loginDto.email,
   'verification code' ,
  `<h1>Your verification code is ${code}</h1>` 
);

return
  }

const accessToken: string = generateAccessToken({ id: user._id, email: user.email,
    name:`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",});


const refreshToken: string = generateRefreshToken({ id: user._id, email: user.email,
    name:`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",});



const ttlRemaining: number = await cacheProvider.ttl(`${loginDto.email}:login`);
const attempts: string | 5 = cachedAttempt ?? 5;
const ttl: number = ttlRemaining === -2 ? toSecounds( 3,  'm' ) : ttlRemaining;
await cacheProvider.set(`${loginDto.email}:login`, String(+attempts - 1), ttl);

return {
  accessToken,
  refreshToken
}
  

  }

   verifyCodeTwoStepVerification=async (verifyCodeTwoStepVerificationDto :VerifyCodeTwoStepVerificationDto ): Promise<{ accessToken: string, refreshToken: string }>=> {
  // 1. check user existence
  const user: any = await userRepository.findByEmail(verifyCodeTwoStepVerificationDto.email); // {} | null
  // 1.1 if you don't exist >> error "User not exist."
  if (!user) throw userNotExist;

  // 2. check otp validation
  const cacheCode: string | null = await cacheProvider.get(
    `${this.twoStepVerificationKey}${verifyCodeTwoStepVerificationDto.email}`
  );

  // 2.1 not exist into DB >> error >> "otp expired" >> resend otp
  if (!cacheCode) throw otpExpired;
  // 2.2 otp stored into DB >> code not equal code stored >> error >> 'Invalid otp'
  if (cacheCode !== verifyCodeTwoStepVerificationDto.code) throw invalidCode;

  // 3. delete otp from cache/DB after successful verification
  await cacheProvider.del(`${this.twoStepVerificationKey}${verifyCodeTwoStepVerificationDto.email}`);

  // 4. generate access Token & refresh Token
 const accessToken: string = generateAccessToken({ id: user._id, email: user.email,
    name:`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",});


const refreshToken: string = generateRefreshToken({ id: user._id, email: user.email,
    name:`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",});

  return {
    accessToken,
    refreshToken
  };
}


  sendOtp=async(sendOtpDto: SendOtpDto)=> {
  // 1. check user existence
  const user = await this.userRepository.findByEmail(sendOtpDto.email);
  if (!user) throw userNotExist;

  // 2. generate OTP code
  const code: string = generateOTPCode();

  // 3. save otp into cache
  await cacheProvider.set(
    `${this.sendOtpKey}${user._id.toString()}`,
    code,
    toSecounds( 3, 'm' )
  );

  // 4. send otp email
  await this.mailProvider.sendEmail(
    sendOtpDto.email,
    'new otp' ,
    `<p>your new otp is ${code}</p>` 
  );
}
  async forgetPassword() {
  
  }

  loginWithGoogle=async (idToken: string)=> {
  // 1. verify idToken
  const payload = await verifyGoogleToken(idToken);
  if (!payload) throw new AppError('no payload provided', 400 );

  // 2. check user exists
  let user = await this.userRepository.findByEmail(payload.email as string);

  // 3. if exists -> generate token, if not -> create user first
  if (!user) {
    user = await this.userRepository.create({
      firstName: payload.name?.plit(' ')[0],
      lastName:payload.name?.split(' ')[1],
      email: payload.email,
      isVerified: true, 
      provider:providerEnums.GOOGLE
     
  }
)
 
}

  return generateAccessToken({
    id: user._id,
    email: user.email,
        name:`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
      });

}
   

 refreshTokenFn = async (token: string) => {
  // 1. validate refresh-token
  const payload = jwt.verify(token, env.jwt.refreshSecret) as TUserPayload;
  
  // 2. generate access-token
  const accessToken: string = generateAccessToken(
    { id: payload.sub, email: payload.email, name:payload.name});

  // 3. generate refresh token
  const refreshToken: string = generateRefreshToken({ id: payload.sub, email: payload.email,});
  
  return {
    accessToken,
    refreshToken
  };
};



}
export default new AuthService()