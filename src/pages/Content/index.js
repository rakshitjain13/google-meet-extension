import * as ml5 from "ml5";
require("@tensorflow/tfjs-backend-webgl");
console.log("Content script works!");
var myDiv = document.createElement("div");

//Set its unique ID.
// myDiv.id = "chrome";

//Add your content to the DIV
let classify = false;
myDiv.innerHTML = '<video id="video_meet_extension"  autoplay></video>';
function beep() {
	var snd = new Audio(
		"data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
	);
	snd.play();
}

let chatopen = false;
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
				beep();
			}
			break;
		case "Camera Off":
			if (document.querySelector(".AAU0Jf").classList.contains("HNeRed")) {
				document.querySelector(".AAU0Jf").click();
				beep();
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
				beep();
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
				beep();
			}
			break;
		case "chat open":
			if (
				chatopen === false &&
				document.querySelectorAll(
					".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
				)[2]
			) {
				document
					.querySelectorAll(
						".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
					)[2]
					.click();
				chatopen = true;
				beep();
			}
			break;
		case "chat close":
			if (
				chatopen === true &&
				document.querySelectorAll(
					".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
				)[2]
			) {
				document
					.querySelectorAll(
						".VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.JsuyRc.boDUxc"
					)[2]
					.click();
				chatopen = false;
				beep();
			}
			break;
		case "captions on" || "captions off":
			document
				.querySelector(
					"#ow3 >     div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.qLBCDc > div > div.VfPpkd-xl07Ob-XxIAqe-OWXEXe-oYxtQd > div:nth-child(1) > span > button"
				)
				.click();
			beep();
			break;
		case "end meet":
			document
				.querySelector(
					"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.rG0ybd.xPh1xb.P9KVBf > div.Kn8SEb > div > div.NHaLPe.kEoTPd > span > button"
				)
				.click();
			if (
				document.querySelector(
					"#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.d6biN.Up8vH.Whe8ub.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div:nth-child(1) > span > span"
				)
			) {
				document
					.querySelector(
						"#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.d6biN.Up8vH.Whe8ub.J9Nfi.iWO5td > div.XfpsVe.J9fJmf > div:nth-child(1) > span > span"
					)
					.click();
				beep();
			}

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
	outputs: 9,
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
let modelloaded = false;
const LoadModel = () => {
	const video = document.getElementById("video_meet_extension");
	brain.load(modelInfo, () => {
		console.log("pose classification ready!");
		console.log(brain);
	});
	const handpose = ml5.handpose(video, () => {
		console.log("Model Loaded!");
		sendMessageToPopup({ type: "MODEL_LOADED" });
		modelloaded = true;
	});
	// Listen to new 'predict' events
	handpose.on("predict", (results) => {
		const predictions = results;
		if (predictions.length > 0 && classify) classifyPose(predictions);
	});
};
const addVoicetochat = (message) => {
	if (
		document.querySelector(
			"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.BC4V9b > div > div.RpC4Ne.oJeWuf > div.F1pOBe.snByac"
		)
	) {
		document.querySelector(
			"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.BC4V9b > div > div.RpC4Ne.oJeWuf > div.F1pOBe.snByac"
		).innerText = "";
		document.querySelector(
			"#ow3 > div.T4LgNb > div > div:nth-child(9) > div.crqnQb > div.R3Gmyc.qwU8Me > div.WUFI9b > div.hWX4r > div > div.BC4V9b > div > div.RpC4Ne.oJeWuf > div.Pc9Gce.Wic03c > textarea"
		).value = message;
    console.log("added");
	}
};

//LoadModel();
//start();
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
		case "START_CLASSIFYING_VOICE":
			break;
		case "STOP_CLASSIFYING_VOICE":
			break;
		case "VOICE_ADD":
			addVoicetochat(msg.trans);
			break;

		case "LOAD_WEBCAM":
		// start();

		case "IS_LOADED":
			if (modelloaded) sendMessageToPopup({ type: "MODEL_LOADED" });
			break;
		default:
			console.log("Did not recognize message type:",msg);
	}
};

chrome.runtime.onMessage.addListener(handleMsg);
