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
    const [loading,setLoading] =  useState<Boolean>(false);
    const [locationInfo,setLocationINfo] = useState<Location | null>(null);


    // TO get the IP address of user
    const getMyIpAddress = async (url:string) :Promise<string> => {
        const res = await fetch(url);
        const info = await res.json();
        return info.ip;
    }

    // To get location using IP address
    const getMyLocation= async (url:string) :Promise<Location> => {
        const res = await fetch(url);
        const info = await res.json();
        
        const country:string = new Intl.DisplayNames(['en'], {type: 'region'}).of(info.country); 

        return {
            ip: info.ip,
            city:info.city,
            country,
            region: info.region
        }
    }

    // click handler 
    const getUserLocation = async()=> {
        setLoading(prev => true);

        const accessTokeForIpinfo:string | undefined = process.env.PLASMO_PUBLIC_IPINFO_ACCESS_TOKEN;

        const myIpAddress: string = await getMyIpAddress(`https://api64.ipify.org?format=json`);
        const currLocation:Location = await getMyLocation(`https://ipinfo.io/${myIpAddress}?token=${accessTokeForIpinfo}`);

        setLocationINfo(prev => currLocation);
        setLoading(prev => false);
    }


    return (

        <main className="h-[80vh] flex flex-col items-center justify-evenly">
            
            {
                locationInfo!=null
                    && 
                <h2 className="text-xl font-semibold">
                    Your country is {locationInfo.country} and city is {locationInfo.city}.
                </h2>
            }

            <button 
                className="bg-red-600 text-xl text-white font-bold p-3 rounded-lg duration-200 hover:scale-110"
                onClick={getUserLocation}
            > 
                {loading ? <Loading/>:`show my location`}
            </button>
        </main>
    )
};

export default Main;