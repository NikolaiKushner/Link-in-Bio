# Security Policy

## Supported Versions

We provide security updates for the latest stable version of Getlnk.

| Version  | Supported          |
| -------- | ------------------ |
| Latest   | :white_check_mark: |
| < Latest | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

- **Email**: security@getlnk.xyz (or use your preferred email)
- **GitHub Security Advisory**: Use the "Report a vulnerability" button on the
  repository's Security tab

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if you have one)

### Response Time

We aim to:

- Acknowledge receipt within 48 hours
- Provide an initial assessment within 7 days
- Keep you updated on our progress

### Disclosure Policy

- We will work with you to understand and resolve the issue
- We will not disclose the vulnerability publicly until a fix is available
- We will credit you in the security advisory (unless you prefer to remain
  anonymous)

## Security Best Practices

### For Users

- Keep your Supabase credentials secure
- Use strong passwords
- Enable 2FA on your Supabase account
- Regularly review your API keys and rotate them if needed
- Never commit `.env` files to version control

### For Developers

- Always validate user input on the server side
- Use Row-Level Security (RLS) in Supabase
- Never expose service role keys to client-side code
- Use environment variables for all secrets
- Keep dependencies up to date
- Review code changes for security implications

## Known Security Considerations

- **Service Role Key**: The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and should
  only be used server-side
- **Authentication**: All API routes verify authentication via `getSession()`
- **Input Validation**: Use validators from `lib/validators.ts`
- **SQL Injection**: Use Supabase's query builder (not raw SQL) to prevent
  injection
- **XSS**: Preact automatically escapes content, but be careful with
  `dangerouslySetInnerHTML`

## Security Architecture

See [SECURITY_REFACTORING.md](./docs/SECURITY_REFACTORING.md) for detailed
security architecture documentation.

## Updates

Security updates will be released as patches to the latest version. We recommend
keeping your installation up to date.
