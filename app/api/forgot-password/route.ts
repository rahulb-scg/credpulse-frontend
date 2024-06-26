import { calculateSecretHash } from "@/constants/auth.option";
import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextRequest, NextResponse } from "next/server";
const clientId = process.env.COGNITO_CLIENT_ID as string; // e.g., 4m0hag52dfnj127l4ijujfn5i6
const clientSecret = process.env.COGNITO_CLIENT_SECRET as string;
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION,
    });
    const SecretHash = calculateSecretHash(data?.email);
    const input = {
      // ForgotPasswordRequest
      ClientId: clientId, // required
      SecretHash: SecretHash,

      Username: data?.email, // required
    };
    const command = new ForgotPasswordCommand(input);
    await client.send(command);
    return NextResponse.json(
      {
        email: data.email,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message,
      },
      { status: 400 },
    );
  }
};
