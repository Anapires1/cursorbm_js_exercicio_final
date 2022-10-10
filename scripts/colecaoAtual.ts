import { API_ROUTE } from "../constants/api.js";

type Receita = {
	Author: string;
	Description: string;
	Ingredients: string[];
	Method: string[];
	Name: string;
	url: string;
	urlImage: string;
};

const numeroReceitasPorPaginas = 50;
let paginaAtual = 1;
const rootElement = document.querySelector("#root");
const rootLottie = document.querySelector("#root-lottie");
const paginacaoElement = document.querySelector(".paginacao");
const rootElementModelo = document.querySelector("#modelo");

const botaoSearch = document.querySelector("#button-search");
const valueInput = document.querySelector("#input");

botaoSearch?.addEventListener("click", () => {
	(valueInput as HTMLInputElement)!.value;
	pesquisaPorElemento((valueInput as HTMLInputElement)!.value);
});

async function getData() {
	const request = await fetch(API_ROUTE.baseUrl());
	const response = await request.json();
	return response;
}

getData();
async function render() {
	try {
		//LOTIIE loading:
		rootElement!.innerHTML = "";
		document.getElementById("paginacao")!.style.display = "none";
		if (rootLottie) {
			document.getElementById("paginacao")!.style.display = "none";
			rootLottie.innerHTML = "";

			rootLottie.innerHTML += `
			<div class="lottie-container">
			<lottie-player src="./lottie/loading.json" background="transparent"  speed="3"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
			</div>
			`;
		}

		const data: Receita[] = await getData();

		// renderPaginacaoButton(data.length);
		const paginated = paginacao(data, paginaAtual);

		console.log("ihi", data);

		document.getElementById("paginacao")!.style.display = "block";
		if (rootElement) {
			rootLottie!.innerHTML = "";
			rootElement.innerHTML = "";
			paginated.forEach((item) => {
				rootElement.innerHTML += `
				<button class="item-wrapper" id="${item.Name}">
				<img class="imagem" src=${item.urlImage}></img>
				<div class="text-container">
				<h3>${item.Name}</h2>
				</div>
				</button>
				`;
			});
		}

		// if (rootElement) {
		// 	rootElement.innerHTML = "";
		// 	for (var i = 0; i < 200; i++) {
		// 		rootElement.innerHTML += `
		// 			<div class="item-wrapper">
		// 			<img class="imagem" src=${data[i].urlImage}></img>
		// 			<div class="text-container">
		// 				<h3>${data[i].Name}</h2>
		// 			</div>
		// 			</div>
		// 		`;
		// 	}
		// }
	} catch {
		if (rootLottie) {
			document.getElementById("paginacao")!.style.display = "none";
			rootLottie.innerHTML = "";

			rootLottie.innerHTML += `
				<div class="lottie-container">
				<lottie-player src="./lottie/error.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop controls autoplay></lottie-player>
				</div>
			`;
		}
	}
	renderizaButtonContainerReceita();

	// const data: Receita[] = await getData();
	// console.log("ihi", data);

	// data.forEach((item) => {
	// 	console.log("oi", item.Name, item.urlImage);
	// });
	//LOTIIE loading:
	// if (rootLottie) {
	// 	rootLottie.innerHTML = "";

	// 	rootLottie.innerHTML += `
	// 		<div class="lottie-container">
	// 			<lottie-player src="./lottie/loading.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop controls autoplay></lottie-player>
	// 		</div>
	// 	`;
	// }

	// if (rootElement) {
	// 	rootElement.innerHTML = "";
	// 	for (var i = 0; i < 200; i++) {
	// 		rootElement.innerHTML += `
	// 		<div class="item-wrapper">
	// 		<img class="imagem" src=${data[i].urlImage}></img>
	// 		<div class="text-container">
	// 			<h3>${data[i].Name}</h2>
	// 		</div>
	// 		</div>
	// 	`;
	// 	}
	// }

	// if (rootElement) {
	// 	rootElement.innerHTML = "";
	// 	data.forEach((item) => {
	// 		rootElement.innerHTML += `
	//     <div class="item-wrapper">
	// 		<img class="imagem" src=${item.urlImage}></img>
	// 		<div class="text-container">
	// 			<h3>${item.Name}</h2>
	// 		</div>
	//     </div>
	//   `;
	// 	});
	// }
}

function cortandoArrayIngredientes(value: string) {
	return value.split(",");
}

async function pesquisaPorElemento(ingredientes: string) {
	const buttonConteinerReceita = document.querySelector("#item-wrapper");
	buttonConteinerReceita?.addEventListener("click", () => {
		console.log("oinnn");
	});
	try {
		console.log("entrou");
		rootElement!.innerHTML = "";
		document.getElementById("paginacao")!.style.display = "none";
		if (rootLottie) {
			rootLottie.innerHTML = "";

			rootLottie.innerHTML += `
			<div class="lottie-container">
			<lottie-player src="./lottie/loading.json" background="transparent"  speed="3"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
			</div>
			`;
		}

		const data = await getData();
		const receitasFiltradasporIngredientes: Receita[] = data.filter(
			(receita: Receita) => {
				const quantidadeIngredientes =
					cortandoArrayIngredientes(ingredientes).length > 1;

				if (!quantidadeIngredientes) {
					const ingrediente = receita.Ingredients.filter((item) => {
						return item.toLowerCase().includes(ingredientes.toLowerCase());
					});

					return ingrediente.length ? receita : false;
				}

				if (quantidadeIngredientes) {
					let acumulador: string[] = [];
					const arrayIngredientes = cortandoArrayIngredientes(ingredientes);

					for (let i = 0; i < arrayIngredientes.length; i++) {
						for (let j = 0; j < receita.Ingredients.length; j++) {
							if (receita.Ingredients[j].includes(arrayIngredientes[i])) {
								acumulador.push(receita.Ingredients[j]);
							}
						}
					}
					if (acumulador.length === arrayIngredientes.length) return true;
				}
			}
		);
		console.log("saiu");
		if (receitasFiltradasporIngredientes.length === 0) {
			if (rootLottie) {
				rootLottie.innerHTML = "";
				document.getElementById("paginacao")!.style.display = "none";
				rootLottie.innerHTML += `
					<div class="lottie-container">
					<lottie-player src="./lottie/error.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop autoplay></lottie-player>
					</div>
				`;
			}
		} else {
			if (rootElement) {
				document.getElementById("paginacao")!.style.display = "none";
				rootLottie!.innerHTML = "";
				rootElement.innerHTML = "";
				receitasFiltradasporIngredientes.forEach((item) => {
					rootElement.innerHTML += `
					<button class="item-wrapper" id="${item.Name}""=>
						<img class="imagem" src=${item.urlImage}></img>
						<div class="text-container">
							<h3>${item.Name}</h2>
						</div>
					</button>
			`;
				});
			}
		}
	} catch {
		if (rootLottie) {
			rootLottie.innerHTML = "";
			document.getElementById("paginacao")!.style.display = "none";
			rootLottie.innerHTML += `
				<div class="lottie-container">
				<lottie-player src="./lottie/error.json" background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop controls autoplay></lottie-player>
				</div>
			`;
		}
	}
	renderizaButtonContainerReceita();
}
render();

function paginacao(items: Receita[], page: number) {
	const receitasPorPagina = items.splice(
		page === 1 ? 0 : (page - 1) * numeroReceitasPorPaginas,
		page === 1
			? numeroReceitasPorPaginas
			: page * numeroReceitasPorPaginas - (page - 1) * numeroReceitasPorPaginas
	);
	if (paginacaoElement) {
		paginacaoElement.innerHTML = "";
		paginacaoElement.innerHTML += `
		<div class="div-paginacao-container">
			<button id="anterior" class="paginacao-button">ANTERIOR</button>
				<div class="div-paginacao">-  ${page}  -</div>
			<button id="proximo" class="paginacao-button">PRÓXIMO</button>
		</div>
		`;
	}
	const botaoAnterior = document.querySelector("#anterior");
	const botaoProximo = document.querySelector("#proximo");

	botaoAnterior?.addEventListener("click", () => {
		if (paginaAtual > 1) {
			paginaAtual--;
		}
		render();
	});
	botaoProximo?.addEventListener("click", () => {
		paginaAtual++;
		render();
	});
	return receitasPorPagina;
}

async function modal(receitaEscolhida: string) {
	if (rootElement) {
		rootElement.innerHTML = "";
		document.getElementById("paginacao")!.style.display = "none";
		const data: Receita[] = await getData();
		let receitinha: Receita[] = [];
		const receita: Receita[] = await data.filter((item, index) => {
			if (item.Name.includes(receitaEscolhida)) {
				return (receitinha = [data[index]]);
			}
		});

		rootLottie!.innerHTML += `
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
							<img class="imagem-modal" src=${receita[0].urlImage}></img>
							<h1>${receita[0].Name}</h1>
						</div>
						<h2 class="info-modal">Author:</h2>
						<h3 class="modal-body">
							${receita[0].Author}
						</h3>
						<h2 class="info-modal">Ingredients:</h2>
						<h3 class="modal-body">
							${receita[0].Ingredients}
						</h3>
						<h2 class="info-modal">Method:</h2>
						<h3 class="modal-body">
							${receita[0].Method}
						</h3>
					</div>
				</div>
			</div>
	`;
		const buttonModal = document.querySelector(".close");
		buttonModal?.addEventListener("click", () => {
			window.history.go(0);
		});
	}
}

function renderizaButtonContainerReceita() {
	const buttonConteinerReceita: HTMLButtonElement[] = Array.from(
		document.querySelectorAll(".item-wrapper")
	);
	buttonConteinerReceita.forEach((element) => {
		element.addEventListener("click", ({ target }) => {
			console.log("iha", element.id), modal(element.id);
		});
	});
}
