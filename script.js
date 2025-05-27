const RAW_JSON_URL = "https://raw.githubusercontent.com/你的帳號/你的Repo/main/data.json";
const RAW_BASE_URL = "https://raw.githubusercontent.com/你的帳號/你的Repo/main/files/";

let files = [];

function $(id) {
  return document.getElementById(id);
}

function showInfo(file) {
  $("creator").textContent = file.creator;
  $("email").textContent = file.email;
  $("created").textContent = file.created_at;
  $("info").classList.remove("hidden");
}

function showPreview(text) {
  $("preview").textContent = text;
  $("preview").classList.remove("hidden");
}

function showDownloadLink(filename) {
  $("download").href = RAW_BASE_URL + filename;
  $("download").classList.remove("hidden");
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    n: params.get("n"),
    p: params.get("p")
  };
}

function lookupFile() {
  const filename = $("filename").value.trim();
  const password = $("password").value;

  const file = files.find(f => f.filename === filename);
  if (!file) return alert("檔案不存在");

  showInfo(file);

  fetch(RAW_BASE_URL + filename)
    .then(res => res.text())
    .then(text => {
      showPreview(text);
      if (password === file.password) {
        showDownloadLink(filename);
      }
    });
}

fetch(RAW_JSON_URL)
  .then(res => res.json())
  .then(data => {
    files = data;
    const { n, p } = getQueryParams();
    if (n) {
      $("filename").value = n;
      if (p) $("password").value = p;
      lookupFile();
    }
  });
