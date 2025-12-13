import MyflixVerifyPasswordEmail from '@/react-email-starter/emails/MyflixVerifyPasswordEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailProps {
  to: string;
  subject: string;
  name: string;
  url: string;
}

export async function sendEmail({ to, subject, name, url }: SendEmailProps) {
  // await resend.emails.send({
  //   from: "MYFLIX <noreply@myflix.stream>",
  //   to,
  //   subject,
  //   html: await render(MyflixVerificationEmail( { url })),
  // })

  await resend.emails.send({
    from: 'MYFLIX <noreply@myflix.stream>',
    to,
    subject,
    react: MyflixVerifyPasswordEmail({name, url}),
  })
}