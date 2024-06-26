import { calculateSecretHash } from "@/constants/auth.option";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { NextRequest, NextResponse } from "next/server";
// const { CognitoIdentityProviderClient, VerifySoftwareTokenCommand } = require("@aws-sdk/client-cognito-identity-provider"); // CommonJS import
const userPoolId = process.env.USER_POOL_ID; // e.g., us-east-1_ydeMGTIr5

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
      // ConfirmSignUpRequest
      ClientId: clientId,
      SecretHash: SecretHash,
      Username: data?.email, // required
      ConfirmationCode: data?.code, // required
    };
    const command = new ConfirmSignUpCommand(input);
    const response = await client.send(command);
    console.log("response", response);
    return NextResponse.json({
      message: "Successfully confirmed",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message,
      },
      { status: 400 },
    );
  }
};
