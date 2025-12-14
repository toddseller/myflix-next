import {
  Body, Button, Column, Container, Head, Html, Img, Preview, Row, Section, Tailwind, Text,
} from '@react-email/components';
import * as React from 'react';

interface MyflixRestPasswordEmailProps {
  name: string;
  url: string;
}

const baseUrl = "https://cdn.myflix.stream/images";

export const MyflixRestPasswordEmail = ({
                                           name,
                                           url,
                                         }: MyflixRestPasswordEmailProps) => {
  const firstName = name.trim().split(' ')[0];
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#efeef1]" style={{ fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif' }}>
          <Preview>{firstName}, someone, hopefully you, just requested to reset your MYFLIX password!</Preview>
          <Container className="max-w-[580px] my-[30px] mx-auto bg-white">
            <Section className="p-[30px]">
              <Img
                width={114}
                src={`${baseUrl}/logo_red.png`}
                alt="MYFLIX"
                className="mx-auto"
              />
            </Section>
            <Section className="w-full">
              <Row>
                <Column className="[border-bottom:1px_solid_rgb(238,238,238)] w-[249px]" />
                <Column className="[border-bottom:1px_solid_rgb(255,0,1)] w-[120px]" />
                <Column className="[border-bottom:1px_solid_rgb(238,238,238)] w-[249px]" />
              </Row>
            </Section>
            <Section className="pt-[5px] px-5 pb-[10px]">
              <Text className="text-[14px] leading-[1.5]">
                MYFLIX - <span className='italic'>What's the password?</span><br/>
                {firstName} - <span className='italic'>What?</span><br/>
                MYFLIX - <span className='italic'>Nope.</span><br/>
                {firstName} - <span className='italic'>Open this door.</span><br/>
                MYFLIX - <span className='italic'>Not even close.</span>
              </Text>
              <Text className="text-[14px] leading-[1.5]">
                Hey {firstName}, someone just requested a password reset for your MYFLIX account. Hopefully it was you! If it wasn't, you can safely ignore this email. If it was you, trust us we understand, just click the Reset Password button.</Text>
              <Button
                className="box-border w-full rounded-[8px] bg-red-600 px-[12px] py-[12px] text-center font-semibold text-white"
                href={url}
              >
                Reset Password
              </Button>
              <Text className="text-[14px] leading-[1.5]">
                Thanks,
                <br />
                MYFLIX Support Team
              </Text>
            </Section>
          </Container>

          <Section className="max-w-[580px] mx-auto">
            <Row>
              <Text className="text-center text-[#706a7b]">
                © {currentYear} MYFLIX, All Rights Reserved <br />
                Somewhere on the internet, Planet Earth.
              </Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

MyflixRestPasswordEmail.PreviewProps = {
  name: 'Todd Seller',
  url: 'https://myflix.stream/reset-password?token=',
} as MyflixRestPasswordEmailProps;

export default MyflixRestPasswordEmail;
