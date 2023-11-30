
document.addEventListener('DOMContentLoaded', function () {
    setMessageBox();
    addStyleInhead()
    initkey();
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".close-btn");
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");


    const inputInitHeight = chatInput.scrollHeight;
    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });
    console.log('asfadfd')
    var host = "http://192.168.0.130";
    var port = "3000";
    var socket = io(host+':'+port);

    var keys="1cd83d1e7a8d809fdf8d1f645541bfac14780d982d98fdde03df37313348ae67";
    document.getElementById("sendBtn").addEventListener("click", function (event) {
        event.preventDefault();
        socket.emit("sendMessageToAdmin", {keys:keys,username:"user3", own_id:getCookieValue('easytalksofthostit'), message: document.getElementById("send").value });

        var html = `<li class="chat outgoing"><p>`+document.getElementById("send").value+'</p>';
        document.querySelector("#messages").insertAdjacentHTML('beforeend', html);
        document.getElementById("send").value = "";
        let messageBox = document.getElementById('messages');
        messageBox.scrollTop = messageBox.scrollHeight;
    });

    socket.on("sendChatToClient::"+keys + getCookieValue('easytalksofthostit'), function (message) {
        // Display the received message on the recipient's side.
        playAlert();
        var html = `<li class="chat incoming" style="margin-top:10px;">
                      <span class="material-symbols-outlined">smart_toy</span>
                      <p>`+message+`</p>
                    </li>`
        document.querySelector("#messages").insertAdjacentHTML('beforeend', html);
        let messageBox = document.getElementById('messages');
                messageBox.scrollTop = messageBox.scrollHeight;
    
      });

    function getUserId(){
        return "2";
    }
    function playAlert() {
      var audio = document.getElementById("alertAudio");
      audio.play();
    }


    chatInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            let sendBtn = document.getElementById('sendBtn')
            sendBtn.click();
        }
    });
    
    // sendChatBtn.addEventListener("click", handleChat);
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
    

});

// dom loaded



// 

function initkey(){
    let cookie_val=getCookieValue('easytalksofthostit');
    if(cookie_val==null){
      console.log('init')
      setCookie('easytalksofthostit',generateMicroKey())
      console.log(generateMicroKey())
    }
}
function padZeros(number, length) {
  return number.toString().padStart(length, '0');
}
function generateMicroKey() {
    const timestamp = Math.floor(Date.now() / 1000);
    const microtime = performance.now();
    const paddedMicrotime = padZeros(String(microtime).replace('.',''), 16);
    const uniqueKey = `${timestamp+String(paddedMicrotime).replace('.','')}`;
    return uniqueKey;
}
function setCookie(name, value) {
  // Set the expiration date to a distant future
  var expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 
  var cookieValue = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; expires=" + expirationDate.toUTCString() + "; path=/";
  document.cookie = cookieValue;
}
function getCookieValue(cookieName) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName + "=") === 0) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
      }
  }
  return null;
}
function setMessageBox()
{
    let messagebox=`<button class="chatbot-toggler">
    <span class="material-symbols-rounded">mode_comment</span>
    <span class="material-symbols-outlined">close</span>
  </button>
  <div class="chatbot">
    <header>
      <h2>Chatbot</h2>
      <span class="close-btn material-symbols-outlined">close</span>
    </header>
    <ul class="chatbox" id="messages">
      <li class="chat incoming">
        <span class="material-symbols-outlined">smart_toy</span>
        <p>Hi there 👋<br>How can I help you today?</p>
      </li>
    </ul>
    <div class="chat-input">
      <textarea placeholder="Enter a message..." spellcheck="false" required id="send"></textarea>
      <span id="sendBtn" class="material-symbols-rounded">send</span>
    </div>
  </div>`;
  document.querySelector("#softhostittalk").insertAdjacentHTML('beforeend', messagebox);
}

function addStyleInhead() {
    const cssStyles = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0');
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }
    .chatbot-toggler {
      position: fixed;
      bottom: 30px;
      right: 35px;
      outline: none;
      border: none;
      height: 50px;
      width: 50px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #724ae8;
      transition: all 0.2s ease;
    }
    body.show-chatbot .chatbot-toggler {
      transform: rotate(90deg);
    }
    .chatbot-toggler span {
      color: #fff;
      position: absolute;
    }
    .chatbot-toggler span:last-child,
    body.show-chatbot .chatbot-toggler span:first-child  {
      opacity: 0;
    }
    body.show-chatbot .chatbot-toggler span:last-child {
      opacity: 1;
    }
    .chatbot {
      position: fixed;
      right: 35px;
      bottom: 90px;
      width: 420px;
      background: #fff;
      border-radius: 15px;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.5);
      transform-origin: bottom right;
      box-shadow: 0 0 128px 0 rgba(0,0,0,0.1),
                  0 32px 64px -48px rgba(0,0,0,0.5);
      transition: all 0.1s ease;
      z-index:100000;
    }
    body.show-chatbot .chatbot {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1);
    }
    .chatbot header {
      padding: 16px 0;
      position: relative;
      text-align: center;
      color: #fff;
      background: #724ae8;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .chatbot header span {
      position: absolute;
      right: 15px;
      top: 50%;
      display: none;
      cursor: pointer;
      transform: translateY(-50%);
    }
    header h2 {
      font-size: 1.4rem;
    }
    .chatbot .chatbox {
      overflow-y: auto;
      height: 510px;
      padding: 30px 20px 100px;
    }
    .chatbot :where(.chatbox, textarea)::-webkit-scrollbar {
      width: 6px;
    }
    .chatbot :where(.chatbox, textarea)::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 25px;
    }
    .chatbot :where(.chatbox, textarea)::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 25px;
    }
    .chatbox .chat {
      display: flex;
      list-style: none;
    }
    .chatbox .outgoing {
      margin: 20px 0;
      justify-content: flex-end;
    }
    .chatbox .incoming span {
      width: 32px;
      height: 32px;
      color: #fff;
      cursor: default;
      text-align: center;
      line-height: 32px;
      align-self: flex-end;
      background: #724ae8;
      border-radius: 4px;
      margin: 0 10px 7px 0;
    }
    .chatbox .chat p {
      white-space: pre-wrap;
      padding: 12px 16px;
      border-radius: 10px 10px 0 10px;
      max-width: 75%;
      color: #fff;
      font-size: 0.95rem;
      background: #724ae8;
    }
    .chatbox .incoming p {
      border-radius: 10px 10px 10px 0;
    }
    .chatbox .chat p.error {
      color: #721c24;
      background: #f8d7da;
    }
    .chatbox .incoming p {
      color: #000;
      background: #f2f2f2;
    }
    .chatbot .chat-input {
      display: flex;
      gap: 5px;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #fff;
      padding: 3px 20px;
      border-top: 1px solid #ddd;
    }
    .chat-input textarea {
      height: 55px;
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      max-height: 180px;
      padding: 15px 15px 15px 0;
      font-size: 0.95rem;
    }
    .chat-input span {
      align-self: flex-end;
      color: #724ae8;
      cursor: pointer;
      height: 55px;
      display: flex;
      align-items: center;
      visibility: hidden;
      font-size: 1.35rem;
    }
    .chat-input textarea:valid ~ span {
      visibility: visible;
    }
    
    @media (max-width: 490px) {
      .chatbot-toggler {
        right: 20px;
        bottom: 20px;
      }
      .chatbot {
        right: 0;
        bottom: 0;
        height: 100%;
        border-radius: 0;
        width: 100%;
      }
      .chatbot .chatbox {
        height: 90%;
        padding: 25px 15px 100px;
      }
      .chatbot .chat-input {
        padding: 5px 15px;
      }
      .chatbot header span {
        display: block;
      }
    }
    `;
  
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
  
    if (styleTag.styleSheet) {
      // for IE
      styleTag.styleSheet.cssText = cssStyles;
    } else {
      styleTag.appendChild(document.createTextNode(cssStyles));
    }
  
    document.head.appendChild(styleTag);
  }
  