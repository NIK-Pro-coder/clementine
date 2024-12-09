/* index.js */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

//Function to run the backend
function runPythonScript(scriptPath, args, callback) {
	const pythonProcess = spawn("python", [scriptPath].concat(args));

	let data = "";
	pythonProcess.stdout.on("data", (chunk) => {
		data += chunk.toString();
	});

	pythonProcess.stderr.on("data", (error) => {
		console.error(`stderr: ${error}`);
	});

	pythonProcess.on("close", (code) => {
		if (code !== 0) {
			console.log(`Error: Script exited with code ${code}`);
			callback(`Error: Script exited with code ${code}`, null);
		} else {
			return callback(null, data);
		}
	});
}

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/"));
app.set("view engine", "ejs");

const router = express.Router();

//Render the main page
app.get("/", function (req, res) {
	res.send("index.html");
});

//Backend call example
app.get("/ordina/:nome/:classe/:numero", function (req, res) {
	const nome = req.params.nome;
	const classe = req.params.classe;
	const numero = req.params.numero;
	runPythonScript(
		"scripts/backend.py",
		["hook", `${nome} di ${classe} vuole ${numero} clementine`],
		(err, result) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(JSON.parse(result));
			}
		},
	);
});

//Open the server
const http = require("http").createServer(app);

app.listen(3000, () => {
	console.log("Server is running on port : 3000");
});