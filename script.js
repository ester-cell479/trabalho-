
const CHAVE = "cyberai_trabalho_v1";

const topicosIniciais = [
    {
        id: "inteligencia-artificial",
        icone: "🤖",
        titulo: "Inteligência Artificial",
        resumo: "Entenda o que é IA e sua relação com a segurança digital.",
        informacoes: "A Inteligência Artificial permite que sistemas analisem dados, reconheçam padrões e realizem tarefas.\n\nEla pode ser utilizada tanto para proteger sistemas quanto para apoiar atividades maliciosas, dependendo da intenção de quem a utiliza.",
        conclusao: "A IA não é necessariamente maliciosa. Seu impacto depende de como é desenvolvida e utilizada."
    },
    {
        id: "robos-inteligentes",
        icone: "🦾",
        titulo: "Robôs e agentes de IA",
        resumo: "Conheça os agentes inteligentes e os riscos da automação.",
        informacoes: "Agentes de IA são sistemas que podem executar tarefas com diferentes níveis de autonomia.\n\nEm situações maliciosas, podem apoiar campanhas de fraude ou atividades de reconhecimento. Por isso, precisam de limites de acesso e supervisão.",
        conclusao: "Quanto maior a autonomia de um sistema, mais importantes são os controles de segurança."
    },
    {
        id: "phishing-inteligente",
        icone: "🎣",
        titulo: "Phishing com IA",
        resumo: "Como mensagens fraudulentas podem ficar mais convincentes.",
        informacoes: "Phishing é uma tentativa de enganar pessoas para obter informações ou induzi-las a realizar ações prejudiciais.\n\nA IA pode ajudar a produzir mensagens convincentes e adaptadas a diferentes públicos.",
        conclusao: "Verifique links e remetentes e confirme pedidos suspeitos por outro canal."
    },
    {
        id: "deepfakes",
        icone: "🎭",
        titulo: "Deepfakes e fraudes",
        resumo: "O uso de voz e imagens sintéticas em golpes digitais.",
        informacoes: "Deepfakes são conteúdos de áudio, imagem ou vídeo gerados ou alterados com inteligência artificial.\n\nEsses conteúdos podem ser utilizados para imitar pessoas e tentar convencer vítimas a compartilhar informações ou realizar pagamentos.",
        conclusao: "Confirme solicitações importantes por um canal independente. Uma gravação não comprova, sozinha, a identidade de alguém."
    },
    {
        id: "malware-automacao",
        icone: "🧩",
        titulo: "Malware e automação",
        resumo: "Entenda os riscos de programas maliciosos associados à IA.",
        informacoes: "Malware é um software desenvolvido para realizar atividades prejudiciais, como roubar informações ou comprometer dispositivos.\n\nA IA pode apoiar algumas tarefas de análise e automação, mas também pode ser utilizada de forma indevida.",
        conclusao: "Atualizações, cópias de segurança e ferramentas de proteção ajudam a reduzir os riscos."
    },
    {
        id: "defesa-cibernetica",
        icone: "🛡️",
        titulo: "Defesa cibernética",
        resumo: "Como utilizar a tecnologia para prevenir ameaças.",
        informacoes: "A defesa cibernética combina tecnologias, processos e práticas para proteger dispositivos, redes e informações.\n\nA IA pode ajudar a detectar comportamentos incomuns e identificar possíveis ameaças.",
        conclusao: "A melhor defesa combina tecnologia, educação, supervisão e responsabilidade."
    }
];

// Lê os dados salvos no navegador.
function carregarTopicos() {
    try {
        const dados = localStorage.getItem(CHAVE);

        if (dados === null) {
            localStorage.setItem(
                CHAVE,
                JSON.stringify(topicosIniciais)
            );

            return topicosIniciais.map(item => ({ ...item }));
        }

        const topicos = JSON.parse(dados);

        if (
            !Array.isArray(topicos) ||
            !topicos.every(item =>
                item &&
                typeof item.id === "string" &&
                typeof item.titulo === "string"
            )
        ) {
            throw new Error("Dados inválidos.");
        }

        return topicos;
    } catch (erro) {
        alert(
            "Não foi possível ler os dados salvos. " +
            "Verifique o armazenamento do navegador."
        );

        return [];
    }
}

let topicos = carregarTopicos();

function salvarTopicos() {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(topicos));
        return true;
    } catch (erro) {
        alert(
            "Não foi possível salvar. Verifique se o navegador " +
            "permite armazenamento e se há espaço disponível."
        );

        return false;
    }
}

// Cria elementos de texto sem interpretar o conteúdo como HTML.
function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

// Monta os cards da página inicial.
function montarCards() {
    const area = document.getElementById("cards");

    if (!area) return;

    area.replaceChildren();

    if (topicos.length === 0) {
        area.appendChild(
            criarElemento(
                "p",
                "texto-suave",
                "Nenhum tópico cadastrado. Clique em Novo tópico."
            )
        );
        return;
    }

    topicos.forEach((topico, indice) => {
        const card = document.createElement("a");

        card.className = "card";
        card.href =
            "detalhe.html?tema=" + encodeURIComponent(topico.id);
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        card.appendChild(
            criarElemento(
                "span",
                "numero-card",
                String(indice + 1).padStart(2, "0")
            )
        );

        card.appendChild(
            criarElemento("span", "icone-card", topico.icone || "📘")
        );

        card.appendChild(
            criarElemento("h3", "", topico.titulo)
        );

        card.appendChild(
            criarElemento("p", "", topico.resumo || "")
        );

        card.appendChild(
            criarElemento("span", "card-abrir", "Abrir conteúdo ↗")
        );

        area.appendChild(card);
    });
}

// Abre o formulário para criar um tópico novo.
function criarTopico() {
    const titulo = prompt("Qual será o título do novo tópico?");

    if (titulo === null) return;

    if (!titulo.trim()) {
        alert("Digite um título para o tópico.");
        return;
    }

    const novo = {
        id: "topico-" + Date.now(),
        icone: "📘",
        titulo: titulo.trim(),
        resumo: "Clique em Editar conteúdo para escrever o resumo.",
        informacoes: "Digite aqui as informações do seu trabalho.",
        conclusao: "Escreva aqui a conclusão deste tópico."
    };

    topicos.push(novo);

    if (!salvarTopicos()) {
        topicos.pop();
        return;
    }

    window.location.href =
        "detalhe.html?tema=" + encodeURIComponent(novo.id);
}

// Configura a página inicial.
const botaoNovo = document.getElementById("novo-topico");

if (botaoNovo) {
    montarCards();
    botaoNovo.addEventListener("click", criarTopico);
}

// Configura a página de detalhes.
const areaDetalhe = document.getElementById("conteudo-detalhe");

if (areaDetalhe) {
    const parametros = new URLSearchParams(window.location.search);
    const idTema = parametros.get("tema");

    let topico = topicos.find(item => item.id === idTema);

    const editor = document.getElementById("editor");
    const formulario = document.getElementById("form-editor");
    const mensagem = document.getElementById("mensagem");

    const botaoEditar = document.getElementById("editar");
    const botaoCancelar = document.getElementById("cancelar-edicao");
    const botaoExcluir = document.getElementById("excluir");
    const botaoImprimir = document.getElementById("imprimir");

    const campoIcone = document.getElementById("campo-icone");
    const campoTitulo = document.getElementById("campo-titulo");
    const campoResumo = document.getElementById("campo-resumo");
    const campoInformacoes =
        document.getElementById("campo-informacoes");
    const campoConclusao =
        document.getElementById("campo-conclusao");

    function exibirConteudo() {
        areaDetalhe.replaceChildren();

        if (!topico) {
            areaDetalhe.appendChild(
                criarElemento(
                    "h1",
                    "titulo-detalhe",
                    "Tópico não encontrado"
                )
            );

            areaDetalhe.appendChild(
                criarElemento(
                    "p",
                    "resumo-detalhe",
                    "Volte à página inicial e escolha um tópico válido."
                )
            );

            botaoEditar.hidden = true;
            botaoExcluir.hidden = true;
            return;
        }

        document.title = topico.titulo + " | CYBERAI";

        areaDetalhe.appendChild(
            criarElemento(
                "div",
                "detalhe-numero",
                (topico.icone || "📘") + "  TÓPICO DA APRESENTAÇÃO"
            )
        );

        const titulo = criarElemento("h1", "titulo-detalhe");
        const textoTitulo = document.createTextNode(topico.titulo + " ");
        const ponto = criarElemento("span", "destaque", ".");
        titulo.append(textoTitulo, ponto);
        areaDetalhe.appendChild(titulo);

        areaDetalhe.appendChild(
            criarElemento("p", "resumo-detalhe", topico.resumo || "")
        );

        const bloco = criarElemento("section", "bloco-info");
        bloco.appendChild(
            criarElemento("h2", "", "Informações principais")
        );
        bloco.appendChild(
            criarElemento("p", "", topico.informacoes || "")
        );
        areaDetalhe.appendChild(bloco);

        const conclusao = criarElemento("section", "bloco-info dica");
        conclusao.appendChild(
            criarElemento("h2", "", "Conclusão")
        );
        conclusao.appendChild(
            criarElemento("p", "", topico.conclusao || "")
        );
        areaDetalhe.appendChild(conclusao);

        botaoEditar.hidden = false;
        botaoExcluir.hidden = false;
    }

    function preencherFormulario() {
        campoIcone.value = topico.icone || "📘";
        campoTitulo.value = topico.titulo || "";
        campoResumo.value = topico.resumo || "";
        campoInformacoes.value = topico.informacoes || "";
        campoConclusao.value = topico.conclusao || "";
    }

    function abrirEditor() {
        if (!topico) return;

        preencherFormulario();
        editor.hidden = false;
        mensagem.textContent = "";

        editor.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function fecharEditor() {
        editor.hidden = true;
        mensagem.textContent = "";
    }

    botaoEditar.addEventListener("click", abrirEditor);
    botaoCancelar.addEventListener("click", fecharEditor);

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        if (!topico) return;

        const tituloNovo = campoTitulo.value.trim();
        const resumoNovo = campoResumo.value.trim();
        const informacoesNovas = campoInformacoes.value.trim();
        const conclusaoNova = campoConclusao.value.trim();

        if (
            !tituloNovo ||
            !resumoNovo ||
            !informacoesNovas ||
            !conclusaoNova
        ) {
            alert("Preencha todos os campos antes de salvar.");
            return;
        }

        const anterior = { ...topico };

        topico.icone = campoIcone.value.trim() || "📘";
        topico.titulo = tituloNovo;
        topico.resumo = resumoNovo;
        topico.informacoes = informacoesNovas;
        topico.conclusao = conclusaoNova;

        if (!salvarTopicos()) {
            Object.assign(topico, anterior);
            return;
        }

        exibirConteudo();
        fecharEditor();

        mensagem.textContent =
            "✓ Informações salvas com sucesso neste navegador!";
    });

    botaoExcluir.addEventListener("click", function() {
        if (!topico) return;

        const confirmar = confirm(
            'Tem certeza de que deseja excluir o tópico "' +
            topico.titulo + '"?'
        );

        if (!confirmar) return;

        const indice = topicos.findIndex(item => item.id === topico.id);

        if (indice === -1) return;

        const removido = topicos.splice(indice, 1)[0];

        if (!salvarTopicos()) {
            topicos.splice(indice, 0, removido);
            return;
        }

        window.location.href = "index.html";
    });

    botaoImprimir.addEventListener("click", function() {
        window.print();
    });

    exibirConteudo();
}
