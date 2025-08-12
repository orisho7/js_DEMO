src = "postscript.js";
token = localStorage.getItem("token");
function signup() {
  const email = document.getElementById("email").value;
  const fname = document.getElementById("name").value;
  const picture = document.getElementById("formFile").files[0];
  const username = document.getElementById("susername").value;
  const password = document.getElementById("spassword").value;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", fname);
  if (picture) {
    formData.append("image", picture);
  }

  axios
    .post("https://tarmeezacademy.com/api/v1/register", formData)
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("profileImage", response.data.user.profile_image);

      const modal = document.getElementById("signupModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showdonealert();
      checklogin();
      window.location.reload();
    })
    .catch((error) => {
      if (error.response.data.errors.email) {
        showerralert(error.response.data.errors.email[0]);
      } else if (error.response.data.errors.username) {
        showerralert(error.response.data.errors.username[0]);
      } else if (error.response.data.errors.password) {
        showerralert(error.response.data.errors.password[0]);
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
      console.log(response.data.user.username);

      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("profileImage", response.data.user.profile_image);

      const modal = document.getElementById("loginModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      showdonealert();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
      showerralert(error.response.data.message);
    });
}

function showerralert(err) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div style="text-align: center; z-index: 5000001;" class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert(`${err}`, "danger");
  setTimeout(() => {
    alertPlaceholder.innerHTML = "";
  }, 100000);
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

  appendAlert("Successfully logged in", "success");
  setTimeout(() => {
    alertPlaceholder.innerHTML = "";
  }, 1000);
}
const profileImage = localStorage.getItem("profileImage");
const profileusername = localStorage.getItem("username");
document.getElementById("pfi").src = profileImage || "default.jpg";

console.log(localStorage.getItem("profileImage"));
document.getElementById("navusername").textContent =
  profileusername || "username";

function checklogin() {
  const token = localStorage.getItem("token");

  const loginbtn = document.getElementById("login-btn");
  const signupbtn = document.getElementById("signup-btn");
  const signoutbtn = document.getElementById("signout-btn");
  const navname = document.getElementById("navusername");
  const navimg = document.getElementById("pfi");
  const postbutton = document.getElementById("post-btn");
  const commentform = document.getElementById("commentform");
  if (token == null) {
    loginbtn.style.display = "block";
    signupbtn.style.display = "block";
    signoutbtn.style.display = "none";
    navname.style.display = "none";
    navimg.style.display = "none";
    postbutton.style.display = "none";
    commentform.style.display = "none";
  } else {
    loginbtn.style.display = "none";
    signupbtn.style.display = "none";
    signoutbtn.style.display = "block";
    navname.style.display = "block";
    navimg.style.display = "block";
    postbutton.style.display = "block";
    commentform.style.display = "block";
  }
}
function signout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("profileImage");
  checklogin();
  window.location.reload();
}
checklogin();
