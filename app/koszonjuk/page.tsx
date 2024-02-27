import Script from "next/script";
import Koszonjuk from "../components/Koszonjuk";

export default function Kapcsolat({params, searchParams}:any) {
  return (
    <>
    <Script 
        id='fb-purchase' 
        strategy='afterInteractive' 
        dangerouslySetInnerHTML={{
            __html:
            `fbq('track', 'Purchase', {value: '${searchParams.value}', currency: 'HUF'});`
        }}
    ></Script>
    <Koszonjuk />
    </>
  )
}
