# ⏰ Google Chat SLA Reminder Bot

Um bot de automação leve e eficiente construído com **Google Apps Script** para enviar lembretes recorrentes em espaços do Google Chat via Webhook. 

Este projeto foi desenhado para equipes de **Suporte de TI e Operações**, ajudando a manter a triagem e categorização de chamados em dia, evitando violações de SLA e garantindo a qualidade dos dados para dashboards de Business Intelligence.

## ✨ Funcionalidades

- **Automação Baseada em Tempo:** Envia mensagens automaticamente em intervalos regulares (ex: a cada 30 minutos).
- **Inteligência de Expediente:** O código possui validação interna para executar **apenas em horário comercial** (08h00 às 17h59).
- **Dias Úteis:** Ignora automaticamente finais de semana (sábados e domingos), evitando notificações indesejadas fora do escopo de trabalho.
- **Custo Zero (Serverless):** Utiliza a infraestrutura nativa e gratuita do Google Workspace, sem necessidade de servidores dedicados ou licenciamento extra.

## 🚀 Como implementar

### 1. Criar o Webhook no Google Chat
1. Vá até o Espaço do Google Chat onde deseja receber os lembretes.
2. Clique no nome do Espaço (no topo) > **Apps e integrações**.
3. Selecione **Gerenciar webhooks** e adicione um novo.
4. Dê um nome ao seu bot e copie a URL gerada.

### 2. Configurar o Google Apps Script
1. Acesse [script.google.com](https://script.google.com/) e crie um **Novo Projeto**.
2. Apague o código padrão e cole o script abaixo:

```javascript
/**
 * Script para envio de lembretes automatizados via Webhook no Google Chat.
 * Focado na manutenção de SLA e triagem de chamados.
 */

function enviarLembreteChat() {
  var agora = new Date();
  var hora = agora.getHours();
  var diaSemana = agora.getDay(); // 0 é Domingo, 6 é Sábado
  
  // Regra de Negócio: Executa apenas de Segunda (1) a Sexta (5), das 08h às 17h59
  if (diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora < 18) {
    
    // Insira a URL do seu Webhook aqui
    var webhookUrl = "SUA_URL_DO_WEBHOOK_AQUI"; 
    
    var mensagem = {
      "text": "⏰ *Lembrete de Triagem:* Pessoal, não se esqueçam de verificar a categorização dos chamados para mantermos o nosso SLA e a qualidade dos dados de BI em dia!"
    };

    var opcoes = {
      "method": "post",
      "headers": {
        "Content-Type": "application/json; charset=UTF-8"
      },
      "payload": JSON.stringify(mensagem)
    };

    // Dispara a requisição para o Google Chat
    UrlFetchApp.fetch(webhookUrl, opcoes);
  }
}
