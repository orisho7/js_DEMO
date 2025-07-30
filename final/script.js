src = "node_modules/axios/dist/axios.js";
function getuserinfo() {
  axios.get("https://tarmeezacademy.com/api/v1/posts").then((response) => {
    for (const post of response.data.data) {
      console.log(post.author.username);
      username = post.author.username;
      profimg = post.author.profile_image;
      postimg = post.image;
      posttitle = post.title;
      postbody = post.body;
      postid = post.id;
      postdate = post.created_at;
      comments = post.comments_count;
      tags = post.tags;

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
                <img
                  class="w-100"
                  src="${postimg}"
                  alt=""
                />
                <h6 style="color: gray">${postdate}</h6>
                <h5 class="card-title"><b>${posttitle}</b></h5>
                <p class="card-text">${postbody}</p>
                <a
                  href="#"
                  class="btn btn-secondary disabled"
                  tabindex="-1"
                  role="button"
                  aria-disabled="true"
                  >${tags}</a
                >
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
    }
  });
}
function login() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  axios
    .post("https://tarmeezacademy.com/api/v1/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "username",
        JSON.stringify(response.data.user.username)
      );
      const modal = document.getElementById("exampleModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showdonealert();
      checklogin();
    })
    .catch((error) => {
      console.log(error);
    });
}
function showdonealert() {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert("Logged in successfully", "success");
}
function checklogin() {
  const token = localStorage.getItem("token");
  const loginbtn = document.getElementById("login-btn");
  const signupbtn = document.getElementById("signup-btn");
  const signoutbtn = document.getElementById("signout-btn");
  if (token == null) {
    loginbtn.style.display = "block";
    signupbtn.style.display = "block";
    signoutbtn.style.display = "none";
  } else {
    loginbtn.style.display = "none";
    signupbtn.style.display = "none";
    signoutbtn.style.display = "block";
  }
}
function signout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  checklogin();
}
checklogin();
getuserinfo();
