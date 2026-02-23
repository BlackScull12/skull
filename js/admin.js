const dropZone = document.getElementById("dropZone");
const image = document.getElementById("image");
const preview = document.getElementById("preview");
const list = document.getElementById("productList");
const dropDateInput = document.getElementById("dropDate");
const forceBtn = document.getElementById("forceBtn");

dropZone.onclick = () => image.click();

image.onchange = () => {
  const r = new FileReader();
  r.onload = () => {
    preview.src = r.result;
    preview.style.display = "block";
  };
  r.readAsDataURL(image.files[0]);
};

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(p) {
  localStorage.setItem("products", JSON.stringify(p));
}

function saveProduct() {
  const p = {
    id: Date.now(),
    name: name.value,
    desc: desc.value,
    price: Number(price.value),
    image: preview.src,
    active: true
  };

  const products = getProducts();
  products.push(p);
  saveProducts(products);
  renderList();
}

function toggleProduct(id) {
  const p = getProducts();
  const item = p.find(x => x.id === id);
  item.active = !item.active;
  saveProducts(p);
  renderList();
}

function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
  renderList();
}

function renderList() {
  list.innerHTML = "";
  getProducts().forEach(p => {
    list.innerHTML += `
      <div class="admin-item">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <div class="toggle" onclick="toggleProduct(${p.id})">${p.active ? "ON" : "OFF"}</div>
        <div class="delete" onclick="deleteProduct(${p.id})">✕</div>
      </div>`;
  });
}

/* DROP CONTROL */

function saveDropDate() {
  localStorage.setItem("dropDate", dropDateInput.value);
  alert("Drop date saved");
}

function forceToggle() {
  const f = localStorage.getItem("forceOpen") === "true";
  localStorage.setItem("forceOpen", !f);
  updateForceBtn();
}

function updateForceBtn() {
  const f = localStorage.getItem("forceOpen") === "true";
  forceBtn.textContent = f ? "FORCE STORE: ON" : "FORCE STORE: OFF";
}

updateForceBtn();
renderList();
