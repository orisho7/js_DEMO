function Getposts(userId) {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      let json = response.data;
      let output = "";
      for (const post of json) {
        output += post.title + "\n" + "\n";
      }
      document.getElementById("titles").textContent = output;
    });
}
function getusersaxios() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        let json = response.data;
        for (const user of json) {
          let btn = document.createElement("button");
          btn.textContent = `${user.name}`;
          btn.addEventListener("click", () => {
            Getposts(user.id);
          });
          document.getElementById("user-buttons").appendChild(btn);
        }
        resolve()
      })
      .catch((err) => {
        alert(err);
      });
  });
}

getusersaxios();
