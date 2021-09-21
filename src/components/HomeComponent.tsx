// import { useEffect, useState } from "react";
// import { getCurrentTabUId, getCurrentTabUrl } from "../chrome/utils";
// import { ChromeMessage, Sender } from "../types";

// export const Home = () => {
// 	const [url, setUrl] = useState<string>("");
// 	const [responseFromContent, setResponseFromContent] = useState<string>("");

// 	useEffect(() => {
// 		getCurrentTabUrl((url) => {
// 			setUrl(url || "undefined");
// 		});
// 	}, []);

// 	const sendTestMessage = () => {
// 		const message: ChromeMessage = {
// 			from: Sender.React,
// 			message: "Hello from React",
// 		};


// 		getCurrentTabUId((id) => {
// 			id &&
// 				chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
// 					setResponseFromContent(responseFromContentScript);
// 				});
// 		});
// 	};

// 	const sendRemoveMessage = () => {
// 		const message: ChromeMessage = {
// 			from: Sender.React,
// 			message: "delete logo",
// 		};
// 		getCurrentTabUId((id) => {
// 			id &&
// 				chrome.tabs.sendMessage(id, message, (response) => {
// 					setResponseFromContent(response);
// 				});
// 		});
// 	};
// 	return (
// 		<div>
// 			{/* <div onClick={() => ShowVideo()} className="cursor-pointer bg-yellow-200 rounded-lg p-1">Start</div> */}
// 			{/* {Allref.current.length > 0 &&
// 				Allreference.map((obj, i) => (
// 					<video width="50" height="50" ref={Allref.current[i]}></video>
// 				))} */}
// 			{url}
// 			<button onClick={()=>sendTestMessage()}>SEND MESSAGE</button>
// 			<button onClick={sendRemoveMessage}>Remove logo</button>
// 			<p>Response from content:</p>
// 			<p>{responseFromContent}</p>
// 		</div>
// 	);
// };
export {};
