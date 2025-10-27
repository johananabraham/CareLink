const SHEET_URL = "Zhttps://docs.google.com/spreadsheets/d/e/2PACX-1vQwhygsZ9TqHoqgeU7NSq9iUsKqPgbdGCV6nI_C4Phu_TyB9qCeby5GrRNsKMGYP-bYfEb-r-ur3ePF/pub?output=csv";

async function loadResources() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const rows = text.split("\n").slice(1).map(r => r.split(","));
  return rows.map(r => ({
    name: r[0],
    category: r[6],
    type: r[7],
    lat: parseFloat(r[8]),
    lng: parseFloat(r[9]),
    description: r[10]
  }));
}

let map = L.map('map').setView([39.9612, -82.9988], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function showResources(category) {
  const resources = await loadResources();
  map.eachLayer(layer => { if (layer instanceof L.Marker) map.removeLayer(layer); });
  resources.filter(r => r.category.toLowerCase() === category.toLowerCase())
           .forEach(r => L.marker([r.lat, r.lng])
                         .addTo(map)
                         .bindPopup(`<b>${r.name}</b><br>${r.description}`));
}

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = handleUserInput;

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "text-right mb-2" : "text-left mb-2";
  msg.innerHTML = `<span class="inline-block px-3 py-2 rounded-lg ${
    sender === "user" ? 'bg-blue-500 text-white' : 'bg-gray-200'
  }">${text}</span>`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function handleUserInput() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  let reply = "";
  if (text.match(/food/i)) reply = "Here are food resources near you!";
  else if (text.match(/shelter|housing/i)) reply = "Here are housing resources!";
  else if (text.match(/medical|clinic|health/i)) reply = "Here are healthcare options!";
  else reply = "I can help you find food, housing, or healthcare resources.";

  addMessage(reply, "bot");

  if (reply.includes("food")) showResources("Food");
  else if (reply.includes("housing")) showResources("Housing");
  else if (reply.includes("health")) showResources("Healthcare");
}