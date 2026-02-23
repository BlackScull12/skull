const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("image");
const preview = document.getElementById("preview");

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

function saveProduct() {
  const product = {
    name: name.value,
    desc: desc.value,
    price: price.value,
    image: preview.src
  };

  let products = JSON.parse(localStorage.getItem("products") || "[]");
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product saved");
}
