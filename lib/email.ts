import MyflixResetPasswordEmail from '@/react-email-starter/emails/MyflixRestPasswordEmail'
import MyflixVerifyPasswordEmail from '@/react-email-starter/emails/MyflixVerifyPasswordEmail';
import { render, toPlainText } from '@react-email/render';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailProps {
  user: {
    email: string;
    name: string;
  };
  url: string;
}

export async function sendVerifyPasswordEmail({ user, url }: SendEmailProps) {
  const html = await render(MyflixVerifyPasswordEmail({name: user.name, url}));
  const text = toPlainText(html);
  await resend.emails.send({
    from: 'MYFLIX <noreply@myflix.stream>',
    to: user.email,
    subject: 'Verify your email address',
    html,
    text,
  })
}

export async function sendResetPasswordEmail({user, url}: SendEmailProps) {
  const html = await render(MyflixResetPasswordEmail({name: user.name, url}));
  const text = toPlainText(html);
  await resend.emails.send({
    from: 'MYFLIX <noreply@myflix.stream>',
    to: user.email,
    subject: 'Reset your password',
    html,
    text,
  })
}