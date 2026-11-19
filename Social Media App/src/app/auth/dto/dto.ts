import { genderEnums} from "../enums/enums";

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  gender?: genderEnums;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface SendOtpDto {
  email: string;
}

export interface VerifyAccountDto {
  email: string;
  code: string;
}
export interface Enable2StepVerificationDto{ 
   email: string;
  }

export interface VerifyCodeActiveTwoStepVerificationDto
{ 
   email: string;code: string;
  }

export interface VerifyCodeTwoStepVerificationDto {
  email: string;code: string;
}

export interface ResetPasswordDto {
  email: string;
  code: string;
  newPassword: string;
}

export interface LogoutDto {
  accessToken: string;
  refreshToken: string;
}