import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
// import * as handpose from "@tensorflow-models/handpose";
import * as ml5 from "ml5";
import { drawHand } from "./utils";

require("@tensorflow/tfjs-backend-webgl");

function Webcammodel() {
	const webcamRef: any = useRef(null);
	const canvasRef: any = useRef(null);

	const LoadModel = () => {
		// if (
		// 	typeof webcamRef.current !== "undefined" &&
		// 	webcamRef.current !== null &&
		// 	webcamRef.current.video.readyState === 4
		// ) {
		// Get Video Properties
		const video = webcamRef.current.video;
	

		// Set video width

		// Set canvas height and width
		canvasRef.current.width = 640;
		canvasRef.current.height = 480;
		console.log("Here");
		const handpose = ml5.handpose(video, () => {
			console.log("Model Loaded!");
		});
		console.log("After");
		// Listen to new 'predict' events
		handpose.on("predict", (results: any) => {
			const predictions = results;
			const ctx = canvasRef.current.getContext("2d");
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			drawHand(predictions, ctx);
		});
	};

	// }
	useEffect(() => {
		LoadModel();
	}, []);
	return (
		<div className="  ">
			<Webcam
				audio={false}
				ref={webcamRef}
				style={{
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					left: 0,
					right: 0,
					textAlign: "center",
					height: "640",
					width: "480",
					zIndex: 9,
					transform: "scaleX(-1)",
				}}
			/>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					marginLeft: "auto",
					marginRight: "auto",
					left: 0,
					right: 0,
					textAlign: "center",
					height: "640",
					width: "480",
					zIndex: 9,
					transform: "scaleX(-1)",
				}}
			/>
		</div>
	);
}

export default Webcammodel;
