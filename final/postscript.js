const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

console.log("Post ID from URL:", postId);
axios
  .get(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
  .then((response) => {
    console.log(response.data.data.author.username);
    username = response.data.data.author.username;
    profimg = response.data.data.author.profile_image;
    postimg = response.data.data.image;
    posttitle = response.data.data.title;
    postbody = response.data.data.body;
    postdate = response.data.data.created_at;
    comments_count = response.data.data.comments_count;
    tags = response.data.data.tags;
    id = response.data.data.id;
    comments = response.data.data.comments;

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
                <hr/>
                <h1>Comments: ${comments_count}</h1> 
               ${
                 token == null
                   ? ""
                   : `<form id="commentform">
                <div class="mb-3">
                <label for="comment" class="col-form-label">Comment:</label>
                <input type="text" class="form-control" id="comment" />
                </div>
                <button type="button" class="btn btn-primary" onclick="addComment()">Submit</button>
                </form>`
               }
                

           <div id="comments-${id}" class="p-3 bg-light">
                    </div>
                <br /><br />
              </div>
            </div>`;

    const currentpost = `tags-${id}`;
    document.getElementById(currentpost).innerHTML = "";

    for (const tag of tags) {
      document.getElementById(
        `tags-${id}`
      ).innerHTML += `<a href="#" class="btn btn-secondary disabled" tabindex="-1" role="button" aria-disabled="true">${tag.name}</a>`;
    }

    const currentcomments = `comments-${id}`;
    document.getElementById(currentcomments).innerHTML = "";

    for (const comment of comments) {
      document.getElementById(
        currentcomments
      ).innerHTML += `<div class="card shadow">
              <div class="card-header">
                <img
                  src="${comment.author.profile_image}"
                  alt=""
                  class="rounded-circle border border-3"
                  style="width: 60px; height: 60px"
                />
                <span> <b>@${comment.author.username}</b></span>
              </div>
              <div class="card-body">
                <p class="card-text">${comment.body}</p>
              </div>
            </div>`;
    }
  });
function addComment() {
  console.log(token);
  axios
    .post(
      `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
      { body: document.getElementById("comment").value },

      { headers: { authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    });
}
