// Create toggle button
const toggleButton = document.createElement("button");
toggleButton.id = "toggleChatBotBtn";
toggleButton.innerText = "💬 Chat";
document.body.appendChild(toggleButton);

// Chatbot HTML
const chatBotContainer = document.getElementById("chatBot");
var path = window.location.pathname;
var page = path.split("/").pop();
const pathOfChatBot = (page == 'index.html' || page == '') ? 'components/chatbot/chatbot.html' : '../components/chatbot/chatbot.html';
fetch(pathOfChatBot)
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar el archivo');
    return response.text();
  })
  .then(html => {
    chatBotContainer.innerHTML = html;
    toggleButton.click();
    toggleButton.click();
    
    // Aquí puedes agregar la lógica para inicializar eventos, botones, etc.
  })
  .catch(error => console.error('Error:', error));

  chatBotContainer.addEventListener('click', () => {
  console.log('El chatbot fue clickeado!');
});

// Show/hide chatbot
let chatVisible = false;
toggleButton.onclick = () => {
  chatVisible = !chatVisible;
  chatBotContainer.style.display = chatVisible ? "flex" : "none";
  toggleButton.style.display= chatVisible ? "none" : "block";

  toggleButton.innerText = chatVisible ? "💬 Chat" : "💬 Chat";

  console.log(chatVisible)
};

toogle = () =>{
  chatVisible = !chatVisible;
  chatBotContainer.style.display = chatVisible ? "flex" : "none";
  toggleButton.innerText = chatVisible ? "💬 Chat" : "💬 Chat";
  toggleButton.style.display= chatVisible ? "none" : "block";
}

// Messaging logic
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (message === "") return;

  addMessage("Tú", message);
  input.value = "";

  const reply = getBotReply(message);
  setTimeout(() => addMessage("Bot", reply), 500);
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const messageWrapper = document.createElement("div");
  const isBot = sender.toLowerCase() === "bot";

  messageWrapper.className = isBot ? "bot-message" : "user-message";
  messageWrapper.innerHTML = `
    <div class="message-text">${text}</div>
    <div class="message-author">${sender}</div>
  `;

  chatBox.appendChild(messageWrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}



function getBotReply(message) {
  const msg = message.toLowerCase();
  if (msg.includes("hola") || msg.includes("buenos días")) return "¡Hola! ¿En qué puedo ayudarte hoy?";
  if (msg.includes("perfume") || msg.includes("fragancia")) return "Tenemos una gran variedad de perfumes. ¿Buscas algo dulce, cítrico o amaderado?";
  if (msg.includes("precio") || msg.includes("cuánto cuesta")) return "Puedes consultar los precios en la sección de 'Fragancias'.";
  if (msg.includes("gracias")) return "¡Con gusto! Si tienes más preguntas, aquí estaré.";
  if (msg.includes("adiós")) return "¡Hasta luego! Que tengas un excelente día.";
  return "Lo siento, en el momento no puedo responder tus preguntas.";
}
