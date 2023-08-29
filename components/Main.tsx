import location2 from "data-base64:~assets/location2.png";
import Loading from "./Loading";
import type { promises } from "dns";
import { useState } from "react";

interface Location {
    ip: string,
    city: string,
    country: string,
    region: string
}

const Main:React.FC = ()  => {
    const [loading,setLoading] =  useState<boolean>(false);
    const [locationInfo,setLocationINfo] = useState<Location | null>(null);
    const [err,setErr] = useState<any>(null);
    

//    console.log(err);

    // click handler 
    const getUserLocation = async()=> {
        setLoading(prev => true);
        const accessTokeForIpinfo:string | undefined = process.env.PLASMO_PUBLIC_IPINFO_ACCESS_TOKEN;

        try{
            // get the ip address
            const resIp = await fetch(`https://api64.ipify.org?format=json`);
            const info = await resIp.json();
            const myIpAddress=info.ip;

            // get the location based on ip address
            const resLoc = await fetch(`https://ipinfo.io/${myIpAddress}?token=${accessTokeForIpinfo}`);
            const infoLoc = await resLoc.json();
            
            // get the country from country code
            const country:string = new Intl.DisplayNames(['en'], {type: 'region'}).of(infoLoc.country); 

            // set the curr state
            setLocationINfo({
                ip: infoLoc.ip,
                city:infoLoc.city,
                country,
                region: infoLoc.region
            });
        }
        catch(err:any){
            setErr(prev => err);
        }
        finally{
            setLoading(prev => false);
        }
    }


    return (

        <main className="h-[80vh] flex flex-col items-center justify-evenly">
            
            {   
                err ?
                    <h2 className="text-xl font-semibold">
                        {err.message ? err.message:"something went wrong!"}
                    </h2>
                :
                    locationInfo
                        && 
                    <h2 className="text-xl font-semibold">
                        Your country is {locationInfo.country} and city is {locationInfo.city}.
                    </h2>
            }

            <button 
                className="bg-red-600 text-xl text-white font-bold p-3 rounded-lg duration-200 hover:scale-110"
                onClick={getUserLocation}
                disabled={loading}
            > 
                {loading ? <Loading/>:`show my location`}
            </button>
        </main>
    )
};

export default Main;