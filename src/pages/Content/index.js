import * as ml5 from "ml5";
require("@tensorflow/tfjs-backend-webgl");
console.log("Content script works!");
var myDiv = document.createElement("div");

//Set its unique ID.
// myDiv.id = "chrome";

//Add your content to the DIV
let classify = false;
myDiv.innerHTML = '<video id="video_meet_extension"  autoplay></video>';

let chatopen=false;
//Finally, append the element to the HTML body
const sendMessageToPopup = (message) => {
	console.log("Send msg to popup:", message);
	chrome.runtime.sendMessage(message);
};
document.body.appendChild(myDiv);
const HandleShape = (type) => {
	switch (type) {
		case "Camera On":
			if (!document.querySelector(".AAU0Jf").classList.contains("HNeRed")) {
				document.querySelector(".AAU0Jf").click();
			}
			break;
		case "Camera Off":
			if (document.querySelector(".AAU0Jf").classList.contains("HNeRed")) {
				document.querySelector(".AAU0Jf").click();
			}
			break;
		case "Mic on":
			if (
				!document
					.querySelector(
						"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.a1GRr.PjGUeb > div > div > span > button"
					)
					.classList.contains("HNeRed")
			) {
			document
				.querySelector(
					"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.a1GRr.PjGUeb > div > div > span > button"
				)
				.click();
			}
			break;
		case "Mic off":
			if (
				document
					.querySelector(
						"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.a1GRr.PjGUeb > div > div > span > button"
					)
					.classList.contains("HNeRed")
			) {
				document
					.querySelector(
						"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.a1GRr.PjGUeb > div > div > span > button"
					)
					.click();
			}
			break;
		case "chat open":
			if (
				chatopen === false &&
				document.querySelectorAll(
					".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
				)[2]
			) {
				document.querySelectorAll(
					".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
				)[2].click();
				chatopen = true;
			}
			break;
		case "chat close":
			if (
				chatopen === true &&
				document.querySelectorAll(
					".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
				)[2]
			) {
				document.querySelectorAll(
					".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
				)[2].click();
				chatopen = false;
			}
			break;
		case "captions on" || "captions off":
			document.querySelector("#ow140 > div:nth-child(1) > span > button > i").click();
			break;
		case "end meet":
			document.querySelector(
				"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.NHaLPe.kEoTPd > span > button"
			).click();
			if(document.querySelector("#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.d6biN.Up8vH.Whe8ub.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div:nth-child(1) > span > span"))
			document
				.querySelector(
					"#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.d6biN.Up8vH.Whe8ub.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div:nth-child(1) > span > span"
				)
				.click();
			break;

		default:
	
	}
};
var start = function () {
	var video = document.getElementById("video_meet_extension"),
		vendorURL = window.URL || window.webkitURL;

	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(function (stream) {
				video.srcObject = stream;
				console.log("streaming");
			})
			.catch(function (error) {
				console.log("Something went wrong");
			});
	}
};
// start();
// window.start=start;
let options = {
	inputs: 42,
	outputs: 3,
	task: "classification",
	debug: true,
};
const modelInfo = {
	model: "https://se-project-form.herokuapp.com/model.json",
	metadata: "https://se-project-form.herokuapp.com/model_meta.json",
	weights: "https://se-project-form.herokuapp.com/model.weights.bin",
};
let brain = ml5.neuralNetwork(options);
const classifyPose = (poses) => {
	const landmarks = poses[0].landmarks;
	let inputs = [];
	for (let i = 0; i < landmarks.length; i++) {
		// Get x point
		const [x, y] = landmarks[i];
		inputs.push(x);
		inputs.push(y);
	}
	brain.classify(inputs, (error, results) => {
		// console.log(results[0]);
		if (error) {
			console.log(error);
		} else {
			if (results[0].confidence > 0.85) {
				console.log(results[0].label, results[0].confidence);
				HandleShape(results[0].label);
			}
		}
		//console.log(results[0].confidence);
	});
};
let modelloaded=false;
const LoadModel = () => {
	const video = document.getElementById("video_meet_extension");
	brain.load(modelInfo, () => {
		console.log("pose classification ready!");
		console.log(brain);
	});
	const handpose = ml5.handpose(video, () => {
		console.log("Model Loaded!");
		sendMessageToPopup({type:"MODEL_LOADED"});
		modelloaded=true;
	});
	// Listen to new 'predict' events
	handpose.on("predict", (results) => {
		const predictions = results;
		if (predictions.length > 0 && classify) classifyPose(predictions);
	});
};

LoadModel();
start();
const handleMsg = (msg, sender, callback) => {
	if (!msg) {
		return;
	}

	console.log("recieved msg:", msg, "from:", sender);
	console.log(classify);
	switch (msg.type) {
		case "START_CLASSIFYING":
			classify = true;
			break;
		case "STOP_CLASSIFYING":
			classify = false;
			break;
		case "LOAD_WEBCAM":
			// start();
			break;
		case "IS_LOADED":
			if(modelloaded)
				sendMessageToPopup({ type: "MODEL_LOADED" });
			break;
		default:
			console.error("Did not recognize message type:");
	}
};

chrome.runtime.onMessage.addListener(handleMsg);
