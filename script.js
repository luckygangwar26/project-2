function start(){
  let pass = document.getElementById("password").value;
  let progress = document.getElementById("progress");
  let status = document.getElementById("status");
  let timeText = document.getElementById("time");
  let security = document.getElementById("security");
  let terminal = document.getElementById("terminal");

  if(pass.length === 0){
    alert("Enter password");
    return;
  }

  terminal.innerHTML = "";
  progress.style.width = "0%";
  status.innerHTML = "Attack Started...";
  terminalLog("Initializing brute force attack...");
  terminalLog("Target length: " + pass.length);

  let chars = 26;
  if(/[A-Z]/.test(pass)) chars += 26;
  if(/[0-9]/.test(pass)) chars += 10;
  if(/[^A-Za-z0-9]/.test(pass)) chars += 10;

  terminalLog("Character set size: " + chars);

  let seconds = Math.pow(chars, pass.length) / 500000;
  let crackTime;

  if(seconds < 60) crackTime = seconds.toFixed(2) + " seconds";
  else if(seconds < 3600) crackTime = (seconds/60).toFixed(2) + " minutes";
  else crackTime = (seconds/3600).toFixed(2) + " hours";

  timeText.innerHTML = "Estimated Crack Time: " + crackTime;

  if(pass.length < 6){
    security.innerHTML = "Password Status: INSECURE";
    security.style.color = "red";
    terminalLog("Weak password detected");
  }else{
    security.innerHTML = "Password Status: SECURE";
    security.style.color = "#00ff00";
    terminalLog("Password complexity acceptable");
  }

  let percent = 0;

  let run = setInterval(()=>{
    percent += Math.floor(Math.random()*10) + 5;
    if(percent > 100) percent = 100;
    progress.style.width = percent + "%";
    terminalLog("Brute forcing... " + percent + "%");

    if(percent >= 100){
      clearInterval(run);
      status.innerHTML = "Password Cracked (Simulation)";
      terminalLog("Attack successful");
      terminalLog("Method used: Brute Force");
      terminalLog("Time taken: " + crackTime);
    }
  }, 500);
}

function terminalLog(text){
  let terminal = document.getElementById("terminal");
  terminal.innerHTML += "> " + text + "<br>";
  terminal.scrollTop = terminal.scrollHeight;
}