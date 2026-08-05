# Innovati Automação — Site institucional

Site estático (HTML + CSS + JS puro, sem build) pronto para publicar no **Cloudflare Pages** a partir do GitHub.

## Estrutura

```
.
├── index.html          # Página inicial
├── downloads.html       # Página de downloads (separada, como no site atual)
├── css/
│   └── styles.css       # Estilos compartilhados entre as páginas
├── js/
│   └── main.js           # Comportamento da barra de navegação
└── assets/
    └── img/
        ├── logo-innovati.png
        └── clients/       # Logos dos clientes exibidos na seção "Clientes"
```

## Publicar no Cloudflare Pages via GitHub

1. Crie um repositório no GitHub e envie todo o conteúdo desta pasta para a raiz dele:
   ```bash
   git init
   git add .
   git commit -m "Site Innovati Automação"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
2. No painel da Cloudflare, vá em **Workers & Pages → Create → Pages → Connect to Git** e selecione o repositório.
3. Nas configurações de build, use:
   - **Framework preset:** None
   - **Build command:** (deixe em branco)
   - **Build output directory:** `/`
4. Clique em **Save and Deploy**. Como não há etapa de build, o deploy é apenas os arquivos estáticos sendo servidos.
5. Depois do primeiro deploy, qualquer novo `git push` na branch `main` publica automaticamente uma nova versão.

## Editar conteúdo

- Textos e links: edite diretamente `index.html` e `downloads.html`.
- Cores, tipografia e espaçamentos: `css/styles.css` (variáveis no topo do arquivo, em `:root`).
- Logos de clientes: adicione o arquivo em `assets/img/clients/` e um novo bloco `.client-card` em `index.html`.
