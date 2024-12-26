import { calculateSecretHash } from "@/constants/auth.option"
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { NextRequest, NextResponse } from "next/server"

const clientId = process.env.COGNITO_CLIENT_ID as string
const clientSecret = process.env.COGNITO_CLIENT_SECRET as string

export async function POST(req: NextRequest) {
  console.log("[POST] /api/verify-token - Processing token verification")
  try {
    const data = await req.json()
    console.log(`[POST] /api/verify-token - Verifying token for email: ${data?.email}`)

    const client = new CognitoIdentityProviderClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION
    })

    const SecretHash = calculateSecretHash(data?.email)
    const input = {
      ClientId: clientId,
      SecretHash: SecretHash,
      Username: data?.email,
      ConfirmationCode: data?.code
    }

    const command = new ConfirmSignUpCommand(input)
    const response = await client.send(command)
    console.log("[POST] /api/verify-token - Successfully verified token")

    return NextResponse.json({
      message: "Successfully confirmed"
    })
  } catch (error: any) {
    console.error("[POST] /api/verify-token - Error:", error)
    return NextResponse.json(
      {
        message: error?.message
      },
      { status: 400 }
    )
  }
}
