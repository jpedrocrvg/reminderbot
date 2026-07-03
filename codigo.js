function enviarLembreteChat() {
  var agora = new Date();
  var hora = agora.getHours();
  var diaSemana = agora.getDay(); 
  
  // Executa apenas de Segunda (1) a Sexta (5), das 08h às 17h59
  if (diaSemana >= 1 && diaSemana <= 5 && hora >= 8 && hora < 18) {
    var webhookUrl = "SUA_URL_DO_WEBHOOK_AQUI"; 
    
    var mensagem = {
      "text": "⏰ Lembrete de meia hora: Verificar categorização de chamados para manter o nosso SLA e a qualidade dos dados!"
    };

    var opcoes = {
      "method": "post",
      "headers": {
        "Content-Type": "application/json; charset=UTF-8"
      },
      "payload": JSON.stringify(mensagem)
    };

    UrlFetchApp.fetch(webhookUrl, opcoes);
  }
}
