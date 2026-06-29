let carrinho = [];


async function carregarProdutos() {
    try {
        const response = await axios.get("/produtos");
        const produtos = response.data;

        const container = document.getElementById("produtos");
        
        container.innerHTML = "";

        produtos.forEach(produto => {
            container.innerHTML += `
                <div class="card">
                    <h3>${produto.nome}</h3>
                    <p class="descricao">${produto.descricao}</p>
                    <div class="preco">R$ ${Number(produto.preco).toFixed(2)}</div>
                    <button onclick="adicionarCarrinho(${produto.id})">
                        <i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho
                    </button>
                </div>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

async function adicionarCarrinho(id) {
    try {
        const response = await axios.get("/produtos");
        const produtos = response.data;

        // 2. Procura o produto pelo ID recebido no parâmetro
        const produto = produtos.find(p => p.id === id);

        if (!produto) {
            console.error("Produto não encontrado.");
            return;
        }
        carrinho.push(produto);

         atualizarContador();
        function atualizarContador() {
            document.getElementById("contador").textContent =
                carrinho.length;
        }

        // 3. Envia o produto encontrado para a rota do carrinho
        await axios.post("/carrinho", produto);       

        
    } catch (erro) {
        console.error("Erro ao adicionar ao carrinho:", erro);
    }
}


async function filtroCategoria(categoria) {
    try {
        const response = await axios.get("/produtos");
        const conteudo = response.data;

        const container = document.getElementById("produtos");

        container.innerHTML = "";

        const filtragem = conteudo.filter(p => {
            return p.categoria === categoria;
        });

        filtragem.forEach(produto => {
            container.innerHTML += `
                <div class="card">
                    <h3>${produto.nome}</h3>
                    <p class="descricao">${produto.descricao}</p>
                    <div class="preco">R$ ${Number(produto.preco).toFixed(2)}</div>
                    <button onclick="adicionarCarrinho(${produto.id})">
                        <i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho
                    </button>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao filtrar produtos por categoria:", erro);
    }
}

async function inputPesquisa() {

    try {
        const response = await axios.get("/produtos");
        const produtos = response.data;

        const inputBusca = document.getElementById("inputBusca");

        inputBusca.addEventListener("input", function () {

            const valorBusca = inputBusca.value.toLowerCase();

            const container = document.getElementById("produtos");
            container.innerHTML = "";

            produtos.forEach(produto => {

                if (produto.nome.toLowerCase().includes(valorBusca)) {

                    container.innerHTML += `
                        <div class="card">
                            <h3>${produto.nome}</h3>
                            <p class="descricao">${produto.descricao}</p>
                            <div class="preco">
                                R$ ${Number(produto.preco).toFixed(2)}
                            </div>
                            <button onclick="adicionarCarrinho(${produto.id})">
                                <i class="fa-solid fa-cart-plus"></i>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    `;

                }

            });

        });

    } catch (erro) {
        console.error("Erro ao filtrar produtos:", erro);
    }

}

function AbrirCarrinho() {
    document
        .getElementById("carrinho")
        .classList.add("aberto");

     carrinho.forEach(produto => {
        document.getElementById("itensCarrinho").innerHTML += `
            <div class="item-carrinho">
                <h3>${produto.nome}</h3>
                <p class="descricao">${produto.descricao}</p>
                <div class="preco">R$ ${Number(produto.preco).toFixed(2)}</div>

                <hr>
            </div>
        `;
     });
}

function FecharCarrinho() {
    document
        .getElementById("carrinho")
        .classList.remove("aberto");

}

carregarProdutos();
inputPesquisa();
