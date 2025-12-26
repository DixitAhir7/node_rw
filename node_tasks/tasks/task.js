// server.js
import http from "http";

const server = http.createServer((req, res) => {
    // Basic routing
    if (req.url === "/" && req.method === "GET") {
        res.end("Home route");
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
});