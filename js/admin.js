const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("image");
const preview = document.getElementById("preview");
const productList = document.getElementById("productList");

dropZone.onclick = () => fileInput.click();

dropZone.ondragover = e => {
  e.preventDefault();
  dropZone.style.borderColor = "white";
};

dropZone.ondragleave = () => {
  dropZone.style.borderColor = "#444";
};

dropZone.ondrop = e => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  showPreview();
};

fileInput.onchange = showPreview;

function showPreview() {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function saveProduct() {
  if (!name.value || !price.value || !preview.src) {
    alert("Fill all fields");
    return;
  }

  const products = getProducts();

  products.push({
    id: Date.now(),
    name: name.value,
    desc: desc.value,
    price: price.value,
    image: preview.src,
    active: true
  });

  saveProducts(products);
  renderList();
  alert("Product saved");
}

function toggleProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  product.active = !product.active;
  saveProducts(products);
  renderList();
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
  renderList();
}

function renderList() {
  productList.innerHTML = "";
  const products = getProducts();

  products.forEach(p => {
    const item = document.createElement("div");
    item.className = "admin-item";

    item.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <div class="toggle" onclick="toggleProduct(${p.id})">
        ${p.active ? "ON" : "OFF"}
      </div>
      <div class="delete" onclick="deleteProduct(${p.id})">✕</div>
    `;

    productList.appendChild(item);
  });
}

renderList();
