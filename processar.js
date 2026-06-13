exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Chave de API não configurada no Netlify.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Body inválido.' }) };
  }

  const SYSTEM = `Você é um especialista em aprendizagem acelerada para o ENEM.
Responda APENAS em JSON válido, sem markdown, sem texto fora do JSON.
Formato obrigatório:
{
  "titulo": "Nome do tema",
  "visao": "Parágrafo de visão geral clara e motivadora (3-4 frases)",
  "historia": "História memorável e vívida que transforma o conceito em narrativa (4-6 frases)",
  "neuro": "3 neuroassociações sensoriais fortíssimas — use linguagem corporal e sensorial",
  "micro": ["Nível 1 básico", "Nível 2 intermediário", "Nível 3 avançado", "Nível 4 expert"],
  "mnem_palavra": "SIGLA ou palavra mnemônica",
  "mnem_linhas": "Linha1\\nLinha2\\nLinha3",
  "quiz": [
    {"q": "pergunta", "opts": ["A","B","C","D"], "corr": 0, "exp": "explicação"},
    {"q": "pergunta", "opts": ["A","B","C","D"], "corr": 1, "exp": "explicação"},
    {"q": "pergunta", "opts": ["A","B","C","D"], "corr": 2, "exp": "explicação"}
  ],
  "revisao_24h": "O que fazer em 24h",
  "revisao_7d": "O que fazer em 7 dias",
  "revisao_30d": "O que fazer em 30 dias",
  "provas": ["ponto1", "ponto2", "ponto3", "ponto4", "ponto5"]
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: `Processe este conteúdo para o ENEM com todas as técnicas de aprendizagem acelerada: ${body.input}`
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar: ' + err.message })
    };
  }
};
