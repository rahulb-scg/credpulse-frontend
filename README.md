# Cred Pulse Frontend

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Checkout dev branch
4. Create a `.env` file in the root directory and add the following environment variables:
5. Run `better-branch` to create a new feature branch
6. Run `npm run dev` to start the development server

## Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_BASE_URL_LOCAL=

NEXT_PUBLIC_AWS_ACCESS_KEY_ID=
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

COGNITO_CLIENT_ID=
COGNITO_CLIENT_SECRET
COGNITO_ISSUER=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=GOCSPX-
```

## Workflow

⚠️ **Do not push to dev or main directly without any code review**

Follow the following flow:

1. Create feature branch from dev branch using ` npx better-branch` CLI
2. Use `npx better-commit` CLI or create commitlint compliant commit messages
3. Push the feature branch to the remote repository
4. Create a pull request from the feature branch to dev branch
5. Assign a reviewer to the pull request
6. Once the reviewer approves the pull request, merge the pull request to dev branch
7. Delete the feature branch

## Commit Messages

Read the [commit message guidelines](https://commitlint.js.org/) before creating a commit message.
For example, the commit message should be in the following format:

### Format

```
commit-type(scope): #ticket-number commit-title
commit-body <optional>
commit-footer <optional>
```

### Example

```
feat(app): #69 add new graph component
```

## Folder Structure

```
├── app
├── components
├── constant
├── graphs
├── hooks
├── services
├── stores
├── types
├── utils
```
