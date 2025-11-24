import { fetchItems } from "./utils.js";

const items = await fetchItems();

if (items.length === 0) {
  throw new Error("상품 데이터를 불러올 수 없습니다.");
}

const ulEl = document.querySelector("ul");

items.forEach((item) => {
  const cnt = localStorage.getItem(`${item.id}`);

  if (!cnt || Number.parseInt(cnt, 10) <= 0) {
    return;
  }

  const liEl = document.createElement("li");
  liEl.innerHTML = `<span>${item.productName} * ${cnt}</span>`;
  ulEl.appendChild(liEl);
});
