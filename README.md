# ENEM Acelerado — Guia de Deploy no Netlify

## 🚀 Como hospedar no Netlify (5 minutos)

### Opção 1 — Arraste e solte (mais fácil)
1. Acesse [netlify.com](https://netlify.com) e crie uma conta gratuita
2. Na dashboard, clique em **"Add new site"** → **"Deploy manually"**
3. Arraste a pasta **`enem-acelerado`** inteira para a área indicada
4. Aguarde o deploy (30 segundos) — seu site estará no ar!

### Opção 2 — Via GitHub (recomendado para atualizações)
1. Crie um repositório no GitHub e faça push desta pasta
2. No Netlify: **"Add new site"** → **"Import an existing project"**
3. Conecte ao GitHub e selecione o repositório
4. Clique em **"Deploy site"**
5. Toda vez que você fizer push, o site atualiza automaticamente

---

## 📁 Estrutura do projeto

```
enem-acelerado/
├── index.html              ← Página inicial
├── netlify.toml            ← Configuração do Netlify
├── css/
│   └── style.css           ← Estilos (tema claro/escuro, responsivo)
├── js/
│   ├── app.js              ← Funções globais (tema, sidebar, progresso)
│   └── data.js             ← Dados das matérias
└── pages/
    ├── materias.html       ← Matérias com as 12 técnicas
    ├── quiz.html           ← Quiz de recuperação ativa
    ├── revisao.html        ← Plano de revisão espaçada
    ├── nervos.html         ← 12 pares de nervos cranianos
    ├── upload.html         ← Enviar conteúdo (com IA)
    └── planner.html        ← Planner de estudos
```

---

## ⚙️ Funcionalidade de IA (página Enviar Conteúdo)

A página `upload.html` usa a API da Anthropic para processar qualquer conteúdo com as 12 técnicas.

**Para ativar:**
1. Obtenha sua chave de API em [console.anthropic.com](https://console.anthropic.com)
2. A chamada à API já está implementada — funciona em produção via Netlify

> ⚠️ **Nota de segurança:** Para uso em produção com muitos usuários, mova a chamada da API para uma Netlify Function (backend), para não expor a chave no frontend.

---

## 🎨 Personalização

- **Cores:** edite as variáveis CSS no início do `css/style.css`
- **Tópicos:** edite o array `topicos` em `js/data.js` para cada matéria
- **Quiz:** adicione questões no array `ALL_QUESTIONS` em `pages/quiz.html`
- **Tema:** o tema escuro/claro é salvo automaticamente no localStorage

---

## 📱 Funcionalidades

- ✅ Design responsivo (mobile e desktop)
- ✅ Tema claro e escuro
- ✅ Progresso salvo no localStorage
- ✅ Quiz interativo com pontuação e sequência de acertos
- ✅ Planner com calendário e lista de tarefas
- ✅ Revisão espaçada (24h, 7 dias, 30 dias)
- ✅ 12 nervos cranianos com protocolo de estudo
- ✅ Integração com IA para processar qualquer conteúdo
- ✅ Marcar tópicos como estudados
