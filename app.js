(async function () {
	const ws = await connectToServer();

	ws.onmessage = (webSocketMessage) => {
		const messageBody = JSON.parse(webSocketMessage.data);
		const messages = document.getElementById("messages");
		// messages.innerHTML(JSON.stringify(messageBody, null, 4));
		console.log("messageBody", messageBody);
		// document.getElementsByClassName("list")[0].append(item);
	};
	const form = document.getElementById("form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const el = e.target;
		const input = e.target[0]; // [0] is the first
		const message = input?.value || "Anonymous";
		console.log(message);
		// Send a message
		ws.send(
			JSON.stringify({
				sender_id: "Ibrahim",
				receiver_id: "Admin",
				message_id: "anything",
				message: message,
			})
		);
	});

	async function connectToServer() {
		const ws = new WebSocket("ws://localhost:7071/ws");
		return new Promise((resolve, reject) => {
			const timer = setInterval(() => {
				if (ws.readyState === 1) {
					clearInterval(timer);
					resolve(ws);
				}
			}, 10);
		});
	}
})();
