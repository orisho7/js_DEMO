function Getusernames() {
  fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
      if (response.ok){
     return response.json()}
    })   .then((json) => {
      for (const user of json) {
        let btn = document.createElement("button");
        btn.textContent = `${user.name}`;
        btn.addEventListener("click", () => {
          Getposts(user.id);
        });
        document.getElementById("user-buttons").appendChild(btn);
      }
    });
 
 
}
function Getposts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((json) => {
      let output = "";
      for (const post of json) {
        output += post.title + "\n" + "\n";
      }
      document.getElementById("titles").textContent = output;
    });
}
Getusernames();
