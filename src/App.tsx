
import "./App.css";
import Webcammodel from "./components/WebCam";


function App() {

	return (
		<div className=" ">
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
			{/* <Home /> */}
			<Webcammodel />
		</div>
	);
}

export default App;
