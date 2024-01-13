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

  
  interface RendelesUgyfelProps {
    nev: string;
    email: string;
    tel: string;
    irszam: string;
    telepules: string;
    utca: string;
    emelet: string;
    fizetesi: {
      keszpenz: boolean;
      bankkartya: boolean;
      szepkartya: boolean;
    }
    megjegyzes: string;
    adatkezelesi: boolean;
    cartItems: [];
  }
  
  export const RendelesUgyfel = ({ nev, email, tel, irszam, telepules, utca, emelet, fizetesi, megjegyzes, adatkezelesi, cartItems }:RendelesUgyfelProps) => (
    <Html>
      <Head />
      <Preview>Rendelésed feldolgozás alatt van!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src='https://peboetterem-online-rendeles.vercel.app/_next/image?url=%2Fpebo-hero-logo.png&w=384&q=75' style={{ width: '150px', height: 'auto', margin: 'auto', paddingTop: '20px' }} />
          <Heading style={{...h1, textAlign: 'center'}}>Kedves {nev}, rendelésedet megkaptuk.</Heading>
          <Text style={{ ...text, marginBottom: '24px'}}>
            A rendelésed feldolgozás alatt van, és a következőket tartalmazza:
          </Text>

            {
                cartItems.map((item:any, index:any) => (

                    <div key={index} style={{ ...grid }}>
                    <Text style={{ ...text, marginBottom: '10px'}} >

                      {item.elsoelotag && item.tipus === 0 ? (
                        <>
                          {item.count + ' x ' + item.nev + `(${item.elsoelotag})`}
                        </>
                      ) : item.tipus === 1 ? (
                        <>
                          {item.count + ' x ' + item.nev + `(${item.masodikelotag})`}
                        </>
                      ) : (
                        <>
                          {item.count + ' x ' + item.nev || item.menunev}
                        </>
                      )}
                  
                  </Text>
                    <Text style={{ ...text, marginBottom: '10px'}} >{item.tipus === 0 ? item.elsodlegesar * item.count : item.masodlagosar * item.count} Ft</Text>
                    </div>

                ))
            }


            <div style={{ ...grid }}>
                <Text style={{ ...text, marginBottom: '10px', color: '#dcad4d'}}><b>Összesen:</b></Text>
                <Text style={{ ...text, marginBottom: '10px',color: '#dcad4d'}}><b>{cartItems.reduce((accumulator: number, currentItem: any) => {
      const itemPrice = currentItem.tipus === 0 ? currentItem.elsodlegesar : currentItem.masodlagosar;
      return accumulator + itemPrice * currentItem.count;
    }, 0)} Ft</b></Text>
            </div>

          
          <Text style={{...text}}>
            Az általad megadott adatok a következők:
          </Text>
            <Text style={{...text}}>
            <b>Név:</b> {nev}<br></br>
            <b>E-mail cím:</b> {email}<br></br>
            <b>Telefonszám:</b> {tel}<br></br>
            <b>Irányítószám:</b> {irszam}<br></br>
            <b>Település:</b> {telepules}<br></br>
            <b>Utca, házszám:</b> {utca}<br></br>
            <b>Emelet, ajtó:</b> {emelet}<br></br>
            <b>Fizetési mód:</b> {fizetesi.keszpenz && <span>Készpénz</span>}{fizetesi.bankkartya && <span>Bankkártya</span>}{fizetesi.szepkartya && <span>Szépkártya</span>}<br></br>
            <b>Üzenet:</b> {megjegyzes}<br></br>
            <b>Adatkezelési tájékoztatót elfogadta?</b> {adatkezelesi ? 'Igen' : 'Nem'}<br></br>
          </Text><Text style={{...text}}>
            A rendelés folyamatáról emailben fogunk tájékoztatni!
          </Text>
          <Text style={{...text}}>
            Ha a rendelési adataidban bármilyen hibát találsz, illetve kérdésed, kérésed, javaslatod lenne, keress minket bátran az alábbi elérhetőségeink egyikén:
          </Text>
          <Text style={{...text}}>
            Telefon: <a style={{...link}} href='tel:0682310633'>06 82 310 633</a>, vagy <a style={{...link}} href='tel:06304940959'>06 30 494 0959</a>
          </Text>
          <Text style={{...text}}>
            Email: <a style={{...link}} href='mailto:info@peboetterem.hu'>info@peboetterem.hu</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default RendelesUgyfel;
  
  const main = {
    backgroundColor: '#ffffff',
  };
  
  const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto',
    background: '#2a2d36',
    borderRadius: '15px'
  };
  
  const h1 = {
    color: '#dcad4d',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 'auto',
    marginTop: '20px',
    padding: '0',
  };
  
  const link = {
    color: '#dcad4d',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };
  
  const text = {
    color: '#dadada',
    fontFamily:
      "'Inter', sans-serif",
    fontSize: '14px',
    
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

  const grid = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '15px',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#3a3f47'
  }
  