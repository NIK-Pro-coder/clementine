function printVal() {
	const input = document.getElementById("clementine");
	let disp = document.getElementById("numDisplay");

	disp.innerHTML = `Costo: € ${Math.round(input.value * 15) / 100}`;
}

function changeNum(amt) {
	let input = document.getElementById("clementine");

	input.value = Math.max(
		1,
		Math.min(parseInt(input.value) + parseInt(amt), 100),
	);

	printVal();
}

let antispam = false;

function order() {
	if (antispam) {
		document.getElementById("spamError").hidden = false;
		return;
	} else {
		document.getElementById("spamError").hidden = true;
	}

	const fields = document.forms["ordinazione"].getElementsByTagName("input");

	let errored = false;

	const numero = fields.clementine.value;

	const consegna = fields.consegna.checked;
	let classe = fields.classe.value;

	if (consegna) {
		if (classe == "") {
			errored = true;
			document.getElementById("classError").hidden = false;
		} else {
			document.getElementById("classError").hidden = true;
			if (isNaN(classe[0]) || !isNaN(classe[1]) || classe.length != 2) {
				errored = true;
				document.getElementById("classErrorInvalid").hidden = false;
			} else {
				document.getElementById("classErrorInvalid").hidden = true;
			}
		}
	} else {
		classe = "no";
	}

	const nome = fields.nome.value;
	if (nome == "") {
		errored = true;
		document.getElementById("nameError").hidden = false;
	} else {
		document.getElementById("nameError").hidden = true;
	}

	if (errored) {
		document.getElementById("successHead").hidden = true;
		return;
	}
	document.getElementById("successHead").hidden = false;

	fetch(`/ordina/${nome}/${classe}/${numero}/${consegna}`);

	antispam = true;

	setTimeout(() => {
		antispam = false;
	}, 10000);
}

function updClass() {
	const show = document.getElementById("consegna").checked;

	document.getElementById("classe").hidden = !show;
}
