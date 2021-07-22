import { useEffect, useState } from "react";
import { getCurrentTabUrl } from "../chrome/utils";

export const Home = () => {
	const [url, setUrl] = useState<string>("");
	useEffect(() => {
		getCurrentTabUrl((url) => {
			setUrl(url || "undefined");
		});
	}, []);
	return <div>{url}</div>;
};
