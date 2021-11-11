import React, { useEffect, useState, useRef } from "react";
const SpeechRecognition = webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
const sendMessageToContent = (message) => {
	console.log("send msg to content:", message);
	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		const activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
};
const VoicetoText = () => {
	const [islistening, Setislistening] = useState(false);
	const [Trans, SetTranscirpt] = useState("");
	const isFirstRender = useRef(true);

	const handleListen = () => {
		console.log("listening?", islistening);

		if (islistening) {
			recognition.start();
			recognition.onend = () => {
				console.log("...continue listening...");
				recognition.start();
			};
		} else {
			recognition.stop();
			recognition.onend = () => {
				console.log("Stopped listening per click");
	    	sendMessageToContent({ type: "VOICE_ADD" ,trans:Trans});
			};
		}
		recognition.onerror = (event) => {
			console.log("Error occurred in recognition: " + event.error);
		};

		let finalTranscript = "";
		recognition.onresult = (event) => {
			let interimTranscript = "";

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) finalTranscript += transcript + " ";
				else interimTranscript += transcript;
			}
			SetTranscirpt(finalTranscript);
			recognition.onstart = () => {
				console.log("Listening!");
			};
		};
	};

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false; // toggle flag after first render/mounting
		} else handleListen();
	}, [islistening]);
	const toggleListen = () => {
		Setislistening(!islistening);
	};
	return (
		<div>
			<button
				onClick={toggleListen}
				className="p-2 bg-blue-700 text-white cursor-pointer m-2"
			>
				Start/Stop Voice Classification
			</button>
			{islistening && (
				<div className="p-2 bg-blue-700 m-2 text-white flex flex-row items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
						/>
					</svg>
          Listening
				</div>
			)}
		</div>
	);
};

export default VoicetoText;
