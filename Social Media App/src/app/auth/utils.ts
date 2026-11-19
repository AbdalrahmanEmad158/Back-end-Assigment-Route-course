import argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../../lib/confiq/env";
import { toMs } from "../../pkg/utils/time";
import { IUser } from "../user/iterfaces/user.interface";
import { TUserPayload } from "../../lib/interface/userPayload.interface";
import { Response } from "express";


export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return argon2.verify(hashedPassword, password);
}

export function generateAccessToken(payload: TUserPayload): string {
  return jwt.sign(
    payload,
    env.jwt.accessSecret,
    { expiresIn: toMs( 1, 'h' ) }
  );
}

export function generateRefreshToken(payload: TUserPayload): string {
  return jwt.sign(
    payload,
    env.jwt.refreshSecret,
    { expiresIn: toMs( 7, 'd' ) }
  );
}

export function setCookies(res: Response, accessToken:string, refreshToken: string): void {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    maxAge: toMs(1, 'h' )
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: toMs(7, 'd' ),
    path: '/api/auth/refresh-token'
  });
}
