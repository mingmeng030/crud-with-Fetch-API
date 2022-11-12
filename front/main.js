const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn-submit");

let output = "";
const url = `http://localhost:5000/api/posts`;

const renderPosts = (posts) => {
  posts.map((post) => {
    output += `
    <div class="card-container">
      <div class="card" data-id=${post._id}>                
          <p class="card-title">${post.title}</p>
          <p class="card-date">${post.date}</p>
          <p class="card-content">${post.body}</p>
          <a href="#" class="card-edit-link" id="edit-post">edit</a>
          <a href="#" class="card-delete-link" id="delete-post">delete</a>
      </div>
  </div>`;
  });
  postsList.innerHTML = output;
};

//Get
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));

postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonIsPressed = e.target.id == "delete-post";
  let editButtonIsPressed = e.target.id == "edit-post";

  let id = e.target.parentElement.dataset.id;

  if (delButtonIsPressed) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  if (editButtonIsPressed) {
    btnSubmit.innerHTML = "Edit Post";
    const parent = e.target.parentElement;
    let titleContent = parent.querySelector(".card-title").textContent;
    let bodyContent = parent.querySelector(".card-content").textContent;

    titleValue.value = titleContent;
    bodyValue.value = bodyContent;
  }

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    btnSubmit.innerHTML = "Add Post";

    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue.value,
        body: bodyValue.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
});

//Create
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderPosts(dataArr);
    })
    .catch((err) => console.log(err));
  titleValue.value = "";
  bodyValue.value = "";
});
