function renderizarHome() {
	const homeContainer: HTMLDivElement | null =
		document.querySelector("#home-container");
	if (homeContainer) homeContainer.innerHTML = "";
	if (homeContainer)
		homeContainer.innerHTML += `
		<div class="title-container">
			<img class="imagem-home" src="./images/salada.png"></img>
			<div class="text-container-home">
				<h2 class="title-info"> Receitas - Chef.com</h2>
				<h3  class="text-info-home">Com a praticidade da vida <br> moderna, muitas pessoas <br> mal sabem usar o micro-<br>ondas. As refeições caseiras <br> não são um luxo, todo mundo <br> pode cozinhar!</h3>
			</div>
		</div>
	`;
}

renderizarHome();
