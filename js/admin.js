// js/admin.js
function save() {
  const product = {
    name: name.value,
    desc: desc.value,
    price: price.value,
    image: URL.createObjectURL(image.files[0])
  };

  let data = JSON.parse(localStorage.getItem("products") || "[]");
  data.push(product);
  localStorage.setItem("products", JSON.stringify(data));
  alert("Saved!");
}
