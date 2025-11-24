import { fetchItems } from "./utils.js";

const items = await fetchItems();

if (items.length === 0) {
  throw new Error("상품 데이터를 불러올 수 없습니다.");
}

const ulEl = document.querySelector("ul");

const modalShowed = localStorage.getItem("modal-showed");

if (!modalShowed) {
  localStorage.setItem("modal-showed", "true");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  function close() {
    modal.style.display = "none";
  }

  modal.innerHTML = `
    <div class="modalInner">
        <span>subscibe us!</span>
        <button class="close-btn">오늘 그만 보기</button>
    </div>
  `;

  document.querySelector("main").appendChild(modal);
  document.querySelector(".close-btn").addEventListener("click", close);
}

items.forEach((item) => {
  const liEl = document.createElement("li");

  liEl.innerHTML = `
    <h3>${item.productName}</h3>
    <img src="./imgs/${item.productImgFileName}" style="width: 200px" />
    <span>${item.productPrice}</span>
    <button id="${item.id}">구입하기</button>
  `;

  liEl.addEventListener("click", () => {
    const currentCnt = localStorage.getItem(`${item.id}`);
    const cnt = currentCnt ? Number.parseInt(currentCnt, 10) : 0;
    localStorage.setItem(`${item.id}`, `${cnt + 1}`);
  });

  ulEl.appendChild(liEl);
});

document.querySelector(".clearCart").addEventListener("click", () => {
  items.forEach((item) => {
    localStorage.removeItem(`${item.id}`);
  });
});

const cartLink = document.querySelector('a[href="./cart.html"]');

cartLink.addEventListener("click", (e) => {
  const hasAnyItem = items.some((item) => {
    const cartItem = localStorage.getItem(`${item.id}`);
    return cartItem && Number.parseInt(cartItem, 10) > 0;
  });

  if (!hasAnyItem) {
    alert("장바구니에 상품이 없습니다.");
    e.preventDefault();
  }
});
