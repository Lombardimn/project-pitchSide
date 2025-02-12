export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}
export interface SendMailParams {
  receiver: string;
  token: string;
  frontendURL: string; // URL del frontend para verificar la cuenta
}