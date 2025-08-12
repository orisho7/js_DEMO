src = "node_modules/axios/dist/axios.js";
function getposts(link) {
  axios.get(link).then((response) => {
    for (const post of response.data.data) {
      console.log(post.author.username);
      username = post.author.username;
      profimg = post.author.profile_image;
      postimg = post.image;
      posttitle = post.title;
      postbody = post.body;
      postdate = post.created_at;
      comments = post.comments_count;
      tags = post.tags;
      id = post.id;

      document.getElementById("posts").innerHTML += `
      <div class="card shadow">
              <div class="card-header">
                <img
                  src="${profimg}"
                  alt=""
                  class="rounded-circle border border-3"
                  style="width: 60px; height: 60px"
                />
                <span> <b>@${username}</b></span>
              </div>
              <div class="card-body">
              <a href="post.html?id=${id}">
                <img
                  class="w-100"
                  src="${postimg}"
                  alt=""
                />
              </a>
                <h6 style="color: gray">${postdate}</h6>
                <h5 class="card-title"><b>${posttitle}</b></h5>
                <p class="card-text">${postbody}</p>
                <span id = "tags-${id}"> </span>
                <hr />
                <a href="">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chat-dots"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                      />
                      <path
                        d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"
                      />
                    </svg>
                    (${comments}) comments</span
                  ></a
                ><br /><br />
                <a href="#" class="btn btn-primary">Like</a>
              </div>
            </div>`;

      const currentpost = `tags-${id}`;
      document.getElementById(currentpost).innerHTML = "";

      for (const tag of tags) {
        document.getElementById(
          `tags-${id}`
        ).innerHTML += `<a href="#" class="btn btn-secondary disabled" tabindex="-1" role="button" aria-disabled="true">${tag.name}</a>`;
      }
    }
  });
}

function post() {
  let formData = new FormData();
  const image = formData.append(
    "image",
    document.getElementById("image").files[0]
  );
  const tilte = formData.append(
    "title",
    document.getElementById("title").value
  );
  const body = formData.append("body", document.getElementById("body").value);
  const date = formData.append("created_at", new Date().toISOString());
  const token = localStorage.getItem("token");
  axios
    .post("https://tarmeezacademy.com/api/v1/posts", formData, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data);
      const modal = document.getElementById("postModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showdonealert();
      checklogin();
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
page = 1;

window.addEventListener("scroll", function () {
  const currentScrollPosition = window.scrollY + window.innerHeight;
  const totalDocumentHeight = document.documentElement.scrollHeight;
  if (currentScrollPosition >= totalDocumentHeight - 1) {
    ++page;
    getposts(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`);
  }
});

getposts("https://tarmeezacademy.com/api/v1/posts");
