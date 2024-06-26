import { secretEnv } from "@/env/server";
import { region } from "@/lib/aws";
import { SignUpFormSchema } from "@/types/user.type";
import {
  AdminGetUserCommand,
  AdminGetUserCommandInput,
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

const userPoolId = process.env.USER_POOL_ID; // e.g., us-east-1_ydeMGTIr5

const clientId = process.env.COGNITO_CLIENT_ID as string; // e.g., 4m0hag52dfnj127l4ijujfn5i6
const clientSecret = process.env.COGNITO_CLIENT_SECRET as string;
export function calculateSecretHash(username: string) {
  const data = username + clientId;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(data);
  return hmac.digest("base64");
}
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CognitoProvider({
      clientId: secretEnv.COGNITO_CLIENT_ID,
      clientSecret: secretEnv.COGNITO_CLIENT_SECRET,
      issuer: secretEnv.COGNITO_ISSUER,
      checks: ["nonce"],
      httpOptions: {
        timeout: 100000,
      },
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: { scope: "openid email profile User.Read  offline_access" },
      },
      httpOptions: { timeout: 10000 },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      // TODO: Handle admin, pw reset, etc.
      authorize: async (credentials) => {
        const { email, password, name, is_register } = credentials as any;

        const cognitoClient = new CognitoIdentityProviderClient({
          region: region,
        });
        if (is_register) {
          const registeredData = await createNewAccount(
            { email, password, name },
            cognitoClient,
          );
        }

        // Configure AWS SDK
        const params: AdminInitiateAuthCommandInput = {
          AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
          ClientId: process.env.COGNITO_CLIENT_ID as string,
          UserPoolId: userPoolId,
          AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
            SECRET_HASH: calculateSecretHash(email),
          },
        };
        try {
          const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params);
          const authResponse = await cognitoClient.send(
            adminInitiateAuthCommand,
          );
          const metaData = authResponse?.["$metadata"];
          if (metaData?.httpStatusCode === 200) {
            const input: AdminGetUserCommandInput = {
              // AdminGetUserRequest
              UserPoolId: userPoolId, // required
              Username: email, // required
            };
            const command = new AdminGetUserCommand(input);
            const response = await cognitoClient.send(command);
            const userId = response?.UserAttributes?.find(
              (el) => el?.Name == "sub",
            )?.Value;
            return {
              accessToken: authResponse.AuthenticationResult?.AccessToken,
              idToken: authResponse?.AuthenticationResult?.IdToken,
              refreshToken: authResponse?.AuthenticationResult?.RefreshToken,
              tokenType: authResponse?.AuthenticationResult?.TokenType,
              expiresIn: authResponse?.AuthenticationResult?.ExpiresIn,
              refreshTokenExpiresIn: 3 * 24 * 60 * 60,
              id: userId as string,
              email: email,
              access_token: authResponse.AuthenticationResult?.AccessToken,
              user: {
                userId: userId,
                username: response?.Username,
                email: email,
                roles: ["user"],
                // Additional user attributes...
              },
            };
          }
          return null;
        } catch (error: any) {
          return handlingError(error, email);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-token",
  },

  callbacks: {
    // add access_token to token object
    async jwt({ token, account, user }) {
      if (account) {
        // console.log("account:", account);
        return {
          ...token,
          access_token: account.access_token,
        };
      }
      return token;
    },

    // add access_token to session so getServerSession/useSession can use it
    async session({ session, token, user }) {
      // console.log("token:", token);
      return {
        ...session,
        access_token: token.access_token,
        user_id: token.sub,
      };
    },
  },
};

const createNewAccount = async (
  data: z.infer<typeof SignUpFormSchema>,
  client: any,
) => {
  // const username = convertNameToUsername(data.name);
  const secreteHash = calculateSecretHash(data?.email);
  const signUpParams = {
    ClientId: clientId,
    Username: data?.email,
    Password: data.password,
    UserAttributes: [
      {
        Name: "email",
        Value: data.email,
      },
      {
        Name: "name",
        Value: data.name,
      },

      // Other user attributes
    ],
    SecretHash: secreteHash,
  };
  try {
    const data = await client.send(new SignUpCommand(signUpParams));
    return data;
  } catch (err: any) {
    return handlingError(err, data?.email);
  }
};

const handlingError = async (err: any, email: string) => {
  if (err?.code === "UsernameExistsException") {
    console.error("Username already exists.");
  } else {
    console.error("Registration failed:", err.message);
  }
  if (err?.__type === "UserNotConfirmedException")
    throw new Error("UserNotConfirmedException");
  throw new Error(err?.message);
};

class CustomError extends Error {
  constructor(message: string, type: string) {
    super(message);
    this.name = type;
  }
}
