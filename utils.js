
const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
const inlineCodePattern = /`([^`]+)`/g;
const boldPattern = /\*\*(.*?)\*\*/g;
const italicPattern = /(\*|_)(.*?)\1/g;
const strikethroughPattern = /~(.*?)~/g;
const headingPattern = /^(#{1,6})\s+(.*)$/gm;
const listPattern = /^(\*|-|\+)\s+(.*)$/gm;
const blockquotePattern = /^>\s+(.*)$/gm;


function validateMessageFormat(message) {
  // Mesajı Regex ifadeleriyle kontrol edin
  let isValid = true;
  let urls = [];

  if (message.match(urlPattern)) {
    console.log("Mesaj URL içeriyor.");
  } else if (message.match(codeBlockPattern)) {
    console.log("Mesaj kod bloğu içeriyor.");
  } else if (message.match(inlineCodePattern)) {
    console.log("Mesaj satır içi kod içeriyor.");
  } else if (message.match(boldPattern)) {
    console.log("Mesaj kalın metin içeriyor.");
  } else if (message.match(italicPattern)) {
    console.log("Mesaj italik metin içeriyor.");
  } else if (message.match(strikethroughPattern)) {
    console.log("Mesaj üstü çizili metin içeriyor.");
  } else if (message.match(headingPattern)) {
    console.log("Mesaj başlık içeriyor.");
  } else if (message.match(listPattern)) {
    console.log("Mesaj liste içeriyor.");
  } else if (message.match(blockquotePattern)) {
    console.log("Mesaj alıntı içeriyor.");
  } 

  if (isValid) {
    message = message
      .replace(urlPattern, '<a href="$1" target="_blank">$1</a>')
      .replace(inlineCodePattern, '<code>$1</code>')
      .replace(boldPattern, '<strong>$1</strong>')
      .replace(italicPattern, '<em>$2</em>')
      .replace(strikethroughPattern, '<del>$1</del>')
      .replace(headingPattern, (match, hashes, text) => `<h${hashes.length}>${text}</h${hashes.length}>`)
      .replace(listPattern, '<li>$2</li>')
      .replace(blockquotePattern, '<blockquote>$1</blockquote>')
      // Kod bloğu formatlamasını en son yapın
      .replace(codeBlockPattern, (match, language, code) => {
        // HTML'yi kaçış yapın - DÜZELTME BURADA
        const escapedCode = code
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '\'');

      const codeLines = escapedCode.split('\n');
      // Şablon dizesindeki tek tırnağı da kaçış yapın
      const formattedCode = codeLines.map(line => `${line}<br>`).join(''); 
      return `<pre><code class="language-${language || ''}">${formattedCode}</code></pre>`;

      let matchUrl;
      while ((matchUrl = urlPattern.exec(message)) !== null) {
        urls.push(matchUrl[0]); 
      }
    });
    
  }


  return { isValid: isValid, formattedMessage: message, urls: urls}; 
}

module.exports = { validateMessageFormat };

