let request = new XMLHttpRequest();
let x = "10";
request.open("GET", "https://jsonplaceholder.typicode.com/posts");
request.responseType = "json";
request.send();
request.onload = function response() {
  let posts = request.response;
  let output = "";
  for (post of posts) {
    output += post.title + "\n" + "\n";
    document.getElementById("titles").textContent = output;
  }
};
