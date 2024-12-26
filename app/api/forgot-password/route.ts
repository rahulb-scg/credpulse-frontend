import { calculateSecretHash } from "@/constants/auth.option"
import { CognitoIdentityProviderClient, ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import { NextRequest, NextResponse } from "next/server"

const clientId = process.env.COGNITO_CLIENT_ID as string
const clientSecret = process.env.COGNITO_CLIENT_SECRET as string

export async function POST(req: NextRequest) {
  console.log("[POST] /api/forgot-password - Processing password reset request")
  try {
    const data = await req.json()
    console.log(`[POST] /api/forgot-password - Initiating password reset for email: ${data?.email}`)

    const client = new CognitoIdentityProviderClient({
      region: process.env.NEXT_PUBLIC_AWS_REGION
    })

    const SecretHash = calculateSecretHash(data?.email)
    const input = {
      ClientId: clientId,
      SecretHash: SecretHash,
      Username: data?.email
    }

    const command = new ForgotPasswordCommand(input)
    await client.send(command)
    console.log("[POST] /api/forgot-password - Successfully initiated password reset")

    return NextResponse.json(
      {
        email: data.email
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[POST] /api/forgot-password - Error:", error)
    return NextResponse.json(
      {
        message: error?.message
      },
      { status: 400 }
    )
  }
}
