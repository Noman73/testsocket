<!DOCTYPE html>
<!-- Coding By CodingNepal - www.codingnepalweb.com -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Chatbot in JavaScript | CodingNepal</title>
    <link rel="stylesheet" href="{{asset('socket/style.css')}}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Fonts Link For Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
    <script src="{{asset('socket/script.js')}}" defer></script>
  </head>
  <body>
    <button class="chatbot-toggler">
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
    </div>


    <audio id="alertAudio">
      <!-- Replace 'path/to/your/soundfile.mp3' with the path to your audio file -->
      <source src="alert.mp3" type="audio/mp3">
    </audio>
      <script src="https://cdn.socket.io/4.7.2/socket.io.min.js" integrity="sha384-mZLF4UVrpi/QTWPA7BjNPEnkIfRFn4ZEO3Qt/HFklTJBj/gBOV8G3HcKn4NfQblz" crossorigin="anonymous"></script>
      <script>
       
      document.addEventListener('DOMContentLoaded', function () {
      initkey();
      console.log('asfadfd')
      var host = "http://localhost";
      var port = "3000";
      var socket = io(host+':'+port);
      

      var keys="1cd83d1e7a8d809fdf8d1f645541bfac14780d982d98fdde03df37313348ae67";
      document.getElementById("sendBtn").addEventListener("click", function (event) {
          event.preventDefault();
          socket.emit("sendMessageToAdmin", {keys:keys,username:"user1", own_id:getCookieValue('easytalksofthostit'), message: document.getElementById("send").value });

          var html = "<div class='float-left'>" + document.getElementById("send").innerText + "</div></br>";
          document.querySelector("#messages").insertAdjacentHTML('beforeend', html);

          document.getElementById("send").value = "";
      });

      socket.on("sendChatToClient::"+keys + getUserId(), function (message) {
          // Display the received message on the recipient's side.
          playAlert();
          var html = `<li class="chat incoming" style="margin-top:10px;">
                        <span class="material-symbols-outlined">smart_toy</span>
                        <p>`+message+`</p>
                      </li>`
          document.querySelector("#messages").insertAdjacentHTML('beforeend', html);
      
        });

      function getUserId(){
          return "2";
      }
      function playAlert() {
        var audio = document.getElementById("alertAudio");
        audio.play();
      }


  });

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
      // Get the current Unix timestamp (in seconds)
      const timestamp = Math.floor(Date.now() / 1000);
      // Get the current microtime (in milliseconds)
      const microtime = performance.now();
      // Concatenate the timestamp and microtime
      const paddedMicrotime = padZeros(String(microtime).replace('.',''), 16);

      const uniqueKey = `${timestamp+String(paddedMicrotime).replace('.','')}`;
      return uniqueKey;
  }
  // function getServerTime(){
  //   fetch('https://tools.aimylogic.com/api/now')
  //   .then(response => {
  //     // Check if the request was successful (status code 200 OK)
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //   })
  //   .then(data => {
  //     console.log('Current time:', data);
  //   })
  //   .catch(error => {
  //     console.error('Fetch error:', error);
  //   });
  // }
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
  
      </script>
  </body>


</html>