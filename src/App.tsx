import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Home } from "./components/HomeComponent";

function App() {
	const videoelement = useRef<any>(null);
	const capturelement = useRef<any>(null);
	const [loading, Setloading] = useState<boolean>(false);
	const [mediastream, Setmediastream] = useState<any>();
	return (
		<div className=" bg-indigo-700 text-white flex justify-center items-center font-serif text-lg">
			{/* <video
				ref={videoelement}
				width="750"
				height="500"
				loop
				muted
				autoPlay
				crossOrigin="anonymous"
				onLoadedData={() =>
					capturelement.current.srcObject=videoelement.current.captureStream()
				}
			>
				<source
					src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4"
					type="video/mp4"
				/>
			</video>
			
				<video width="750" height="500" autoPlay ref={capturelement}>
				</video> */}
			<Home />
		</div>
	);
}

export default App;
