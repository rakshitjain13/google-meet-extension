import React, { useEffect, useState } from "react";

import "./tailwind.css";
const sendMessageToContent = (message) => {
	console.log("send msg to content:", message);
	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		const activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, message);
	});
};
const registerListener = (setState, ) => {
	chrome.runtime.onMessage.addListener((msg, sender, callback) => {
		console.log("Popup recieved msg:", msg, "from:", sender);
		switch (msg.type) {
			// Do nothing, these msgs are handled by the content script.
			case "MODEL_LOADED":
				setState(false);
				break;
			default:
				break;
		}
	});
};
const Popup = () => {
	const [isLoaded,SetisLoaded]=useState(true);
	useEffect(() => {
		registerListener(SetisLoaded);
		sendMessageToContent({type:"IS_LOADED"});
	}, [])
	return (
		<div className="bg-blue-500 p-2 w-64">
			{isLoaded ? (
				<div className="p-2 bg-blue-700 text-white  m-2">Loading</div>
			) : (
				<div className="flex flex-col items-center content-center">
					<div className="text-white text-base font-semibold ">
						A Google Meet Extension
					</div>
					<div
						className="p-2 bg-blue-700 text-white cursor-pointer m-2"
						onClick={() => sendMessageToContent({ type: "START_CLASSIFYING" })}
					>
						Start
					</div>
					<div
						className="p-2 bg-blue-700 text-white cursor-pointer m-2"
						onClick={() => sendMessageToContent({ type: "STOP_CLASSIFYING" })}
					>
						Stop
					</div>
					<div className="text-white">
						<span className="text-white text-lg font-semibold">Instructions</span>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Camera on : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/c.PNG?raw=true"
								alt="C"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Camera off : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/d.PNG?raw=true"
								alt="d"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Mic On : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/b.PNG?raw=true"
								alt="b"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Mic off : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/a.PNG?raw=true"
								alt="a"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Chat open : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/f.PNG?raw=true"
								alt="f"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Chat close : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/g.PNG?raw=true"
								alt="g"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>Captions Toggle : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/w.PNG?raw=true"
								alt="w"
								className="h-12 w-12"
							/>
						</div>
						<div className="text-lg flex flex-row items-center font-semibold mt-1">
							<div>End meet : </div>
							<img
								src="https://github.com/rakshitjain13/google-meet-extension/blob/master/public/y.PNG?raw=true"
								alt="y"
								className="h-12 w-12"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Popup;
