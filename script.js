let fileData = [];

const DATA_URL = 'https://raw.githubusercontent.com/i-like-dev/pdf/main/data.json';

fetch(DATA_URL)
  .then(response => response.json())
  .then(data => {
    fileData = data;
  })
  .catch(error => {
    alert("無法載入資料庫！");
    console.error(error);
  });

let currentFile = null;

function lookupFile() {
  const filename = document.getElementById("filename").value.trim();
  const fileInfo = fileData.find(item => item.filename === filename);

  if (fileInfo) {
    currentFile = fileInfo;
    document.getElementById("file-info").style.display = "block";
    document.getElementById("creator").innerText = fileInfo.creator;
    document.getElementById("email").innerText = fileInfo.email;
    document.getElementById("created_at").innerText = fileInfo.created_at;
    document.getElementById("download-section").style.display = "none";
  } else {
    alert("找不到該檔案！");
    currentFile = null;
    document.getElementById("file-info").style.display = "none";
  }
}

function verifyPassword() {
  const passwordInput = document.getElementById("password").value;
  if (currentFile && passwordInput === currentFile.password) {
    document.getElementById("download-link").href = currentFile.download_url;
    document.getElementById("download-section").style.display = "block";
  } else {
    alert("密碼錯誤！");
    document.getElementById("download-section").style.display = "none";
  }
}
