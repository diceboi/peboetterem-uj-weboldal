import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactUsAdminProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  policy: string;
}

export const ContactUsAdmin = ({name, email, phone, message, policy}:ContactUsAdminProps) => (
  <Html>
    <Head />
    <Preview>{name} a válaszodra vár.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name} most töltötte ki a kapcsolatfelvételi űrlapot a weboldalon.</Heading>
        <Text style={{ ...text, marginBottom: '24px'}}>
          Kérlek amint időd engedi válaszolj neki.
        </Text>
        <Text style={{...text}}>
          Az űrlap a következőket tartalmazza:
        </Text>
          <Text style={{...text}}>
          <b>Név:</b> {name}<br></br>
          <b>E-mail cím:</b> {email}<br></br>
          <b>Telefonszám:</b> {phone}<br></br>
          <b>Üzenet:</b> {message}<br></br>
          <b>Adatkezelési tájékoztatót elfogadta?</b> {policy}<br></br>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactUsAdmin;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#312252',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};
