const memoForm = document.querySelector("#memo-form");
const memoTitle = document.querySelector("#memo-form input");
const memoContent = document.querySelector("textarea");
const memoList = document.querySelector("#memo-list");
const memoBtn = document.querySelector("#memo-btn");
const myModal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close");

const MEMOS_KEY = "memos"; // 저장할 데이터의 키값 설정

let memos = [];

memoBtn.addEventListener("click", openModal);

function openModal(event) {
  event.preventDefault();
  myModal.style.display = "block";
}

closeBtn.addEventListener("click", function () {
  console.log(closeBtn);
  myModal.style.display = "none";
  handleMemoSubmit(event);
});

window.addEventListener("click", function (event) {
  if (event.target === myModal) {
    myModal.style.display = "none";
    handleMemoSubmit(event);
  }
});

function handleMemoSubmit(event) {
  const newMemoTitleObj = {
    text: memoTitle.value,
    id: Date.now(),
  };
  const newMemoContentObj = {
    text: memoContent.value,
    id: Date.now(),
  };
  if (newMemoTitleObj.text === "") {
    newMemoTitleObj.text = "제목없음";
  }
  memoTitle.value = "";
  memoContent.value = "";
  paintMemo(newMemoTitleObj, newMemoContentObj);
}

function saveMemos() {
  localStorage.setItem(MEMOS_KEY, JSON.stringify(memos));
}

function deleteMemo(event) {
  const li = event.target.parentElement;
  li.remove();
  memos = memos.filter((memo) => memo.id !== li.id);
  saveMemos();
}

function paintMemo(newMemoTitle, newMemoContent) {
  const li = document.createElement("li");
  li.id = newMemoTitle.id;
  const title = document.createElement("h2");
  title.textContent = newMemoTitle.text;
  const content = document.createElement("p");
  content.textContent = newMemoContent.text;
  const button = document.createElement("button");
  button.textContent = "삭제";
  button.addEventListener("click", deleteMemo);
  memoList.append(li);
  li.append(title, content, button);

  memos.push({
    title: newMemoTitle.text,
    content: newMemoContent.text,
    id: newMemoTitle.id,
  });
  saveMemos();
}

function loadMemos() {
  const loadedMemos = localStorage.getItem(MEMOS_KEY);
  if (loadedMemos !== null) {
    const parsedMemos = JSON.parse(loadedMemos);
    parsedMemos.forEach((memo) =>
      paintMemo(
        { text: memo.title, id: memo.id },
        { text: memo.content, id: memo.id }
      )
    );
  }
}

loadMemos();
