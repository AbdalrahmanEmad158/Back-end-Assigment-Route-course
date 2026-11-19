import { OAuth2Client } from "google-auth-library";
import { AppError } from "../error/error";
import { env } from "../confiq/env";

const client = new OAuth2Client();

export async function verifyGoogleToken(idToken: string): Promise<any> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: [env.google.webClientId, env.google.iosClientId],
    });
    return ticket.getPayload();
  } catch (err) {
    throw new AppError('invalid google token', 403);
  }
}
