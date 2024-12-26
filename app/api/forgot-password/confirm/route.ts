import { calculateSecretHash } from "@/constants/auth.option"
import { CognitoIdentityProviderClient, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { NextRequest, NextResponse } from "next/server"

const clientId = process.env.COGNITO_CLIENT_ID as string
const clientSecret = process.env.COGNITO_CLIENT_SECRET as string

export async function POST(req: NextRequest) {
  console.log("[POST] /api/forgot-password/confirm - Processing password reset confirmation")
  try {
    const data = await req.json()
    console.log(`[POST] /api/forgot-password/confirm - Confirming password reset for email: ${data?.email}`)

    const client = new CognitoIdentityProviderClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION
    })

    const SecretHash = calculateSecretHash(data?.email)
    const input = {
      ClientId: clientId,
      SecretHash: SecretHash,
      Password: data?.password,
      ConfirmationCode: data?.code,
      Username: data?.email
    }

    const command = new ConfirmForgotPasswordCommand(input)
    await client.send(command)
    console.log("[POST] /api/forgot-password/confirm - Successfully confirmed password reset")

    return NextResponse.json(
      {
        email: data.email
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[POST] /api/forgot-password/confirm - Error:", error)
    return NextResponse.json(
      {
        message: error?.message
      },
      { status: 400 }
    )
  }
}
