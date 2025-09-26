export class Config {
  public static readonly PORT = Number(process.env.PORT) || 3333;

  // Mail Configuration
  public static readonly MAIL_HOST = process.env.MAIL_HOST || 'smtp.mailtrap.io';
  public static readonly MAIL_PORT = Number(process.env.MAIL_PORT) || 2525;
  public static readonly MAIL_USER = process.env.MAIL_USER || '';
  public static readonly MAIL_PASS = process.env.MAIL_PASS || '';

  // Application Configuration
  public static readonly APP_NAME = process.env.APP_NAME || 'SOLID API';
  public static readonly FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@app.com';
  public static readonly FROM_NAME = process.env.FROM_NAME || 'SOLID API Team';

  public static validate(): void {
    const requiredVars = [
      'MAIL_USER',
      'MAIL_PASS'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
}
