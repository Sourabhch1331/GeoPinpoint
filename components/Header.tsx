import location from "data-base64:~assets/location.png"

const Header:React.FC = ()=> {
    return (
        <header className="h-[20vh] flex items-center">
            <h1 className="m-auto text-2xl font-semibold flex items-center justify-center">
			    Geo Pinpoint
			    <img className="h-8 w-8 pointer-events-none" src={location} alt="Some pretty cool image" />
			</h1>
        </header>
    )
};

export default Header;