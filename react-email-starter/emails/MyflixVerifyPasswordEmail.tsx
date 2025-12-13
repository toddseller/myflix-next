import {
  Body, Button, Column, Container, Head, Html, Img, Preview, Row, Section, Tailwind, Text,
} from '@react-email/components';
import * as React from 'react';

interface MyflixVerifyPasswordEmailProps {
  name: string;
  url: string;
}

const baseUrl = "https://cdn.myflix.stream/images";

export const MyflixVerifyPasswordEmail = ({
                                           name,
                                           url,
                                         }: MyflixVerifyPasswordEmailProps) => {
  const firstName = name.trim().split(' ')[0];
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#efeef1]" style={{ fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif' }}>
          <Preview>Welcome to MYFLIX! Let's verify your email.</Preview>
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
              <Text className="text-[14px] leading-[1.5]">Hello{' '}{firstName}.</Text>
              <Text className="text-[14px] leading-[1.5]">
                My name is Inigo Montoya. You killed my father. Prepare to die!
              </Text>
              <Text className="text-[14px] leading-[1.5]">
                We're just joking! We just love movies and TV shows so much, we couldn't resist.
              </Text>
              <Text className="text-[14px] leading-[1.5]">
                Welcome to MYFLIX! We're excited to have you on board and can't wait to explore your new library.
                But first, let's finish verifying your email address.
              </Text>
              <Button
                className="box-border w-full rounded-[8px] bg-red-600 px-[12px] py-[12px] text-center font-semibold text-white"
                href={url}
              >
                Verify your email address
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

export default MyflixVerifyPasswordEmail;
