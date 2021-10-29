import { useEffect, useRef ,useState} from "react";
import Webcam from "react-webcam";
// import * as handpose from "@tensorflow-models/handpose";
import * as ml5 from "ml5";
import { drawHand } from "./utils";

require("@tensorflow/tfjs-backend-webgl");

let options = {
	inputs: 42,
	outputs: 3,
	task: "classification",
	debug: true,
};
const modelInfo = {
	model: "./model.json",
	metadata: "./model_meta.json",
	weights: "./model.weights.bin",
};
function TrainModel() {
	const webcamRef: any = useRef(null);
	const canvasRef: any = useRef(null);
    const brain:any=useRef(null);
    const [loaded,Setloaded]=useState(false);
    const [poses, Setposes]:any = useState([]);
    const [collecting, Setcollecting] = useState(false);
    const [targetLabel, Setlabel] = useState("");
    
	const LoadModel = () => {
		
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
        brain.current.load(modelInfo, () => {
					console.log("pose classification ready!");
				});
		// Listen to new 'predict' events
		handpose.on("predict", (results: any) => {
			const predictions = results;
			const ctx = canvasRef.current.getContext("2d");
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			drawHand(predictions, ctx);
            if(predictions.length>0)
                classifyPose(predictions);
            
           
		});
	};

	// }
	useEffect(() => {
        brain.current = ml5.neuralNetwork(options);
		LoadModel();
	}, []);
    
  
        const classifyPose = (poses:any) => {
				  const landmarks = poses[0].landmarks;
			    let inputs = [];
                for (let i = 0; i < landmarks.length; i++) {
                        // Get x point
                        const [x, y] = landmarks[i];
                    inputs.push(x);
                    inputs.push(y);
                    
                    }
				brain.current.classify(inputs, (error:Error, results:any) => {
					// console.log(results[0]);
					if (error) {
						console.log(error);
					} else  {

						console.log(results[0].label,results[0].confidence);
					}
					//console.log(results[0].confidence);
				});

		};

    
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
            {/* <input
					type="text"
					name="label"
					className=" border-black border-2"
					onChange={(e) => Setlabel(e.target.value)}
				/>

				<div
					className="inline-block px-3 py-2 rounded-xl cursor-pointer bg-yellow-400 text-lg text-black"
					onClick={() => savedata()}
				>
					Save
				</div>
				<div
					className="inline-block px-3 py-2 rounded-xl cursor-pointer bg-yellow-400 text-lg text-black"
					onClick={() => collecttrain()}
				>
					Train
				</div>
				<p className="text-3xl text-black">
					{collecting?" Collecting ":"Not Collecting"}
				</p> */}
		</div>
	);
}

export default TrainModel;
