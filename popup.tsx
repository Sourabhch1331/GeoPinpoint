import { useState } from "react";
import Header from "~components/Header";
import Main from "~components/Main";
import "./style.css"

const IndexPopup:React.FC =()=> {

	return (
		<div className="w-[500px] h-[500px]">
			<Header/>
			<Main/>
		</div>
	)
}

export default IndexPopup
