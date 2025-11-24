export async function fetchItems() {
  try {
    const res = await fetch("./mock.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const items = await res.json();
    return items;
  } catch (error) {
    console.error("상품 데이터를 불러오는 중 오류가 발생했습니다:", error);
    alert("상품 데이터를 불러올 수 없습니다. 페이지를 새로고침해주세요.");
    return [];
  }
}
