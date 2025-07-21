swiper = new Swiper(".swiper-container");
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
swiper.on("slideChange", function () {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const country = activeSlide.getAttribute("data-country");
  if (country === "Syria") {
    axios
      .get(
        "https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Homs&country=Syria"
      )
      .then((response) => {
        let timings = response.data.data.timings;
        console.log(timings);

        // You can display timings in your UI here
      });
  }else if (country === "SA") {
    axios
      .get(
        "https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Riyadh&country=Saudi Arabia"
      )
      .then((response) => {
        let timings = response.data.data.timings;
        console.log(timings);

        // You can display timings in your UI here
      });
  }
   else {
    console.log(" not found");
  }
});

// axios
//   .get(
//     "https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Homs&country=Syria"
//   )
//   .then((response) => {

//     if (document.getElementById("Syria").style.visibility ==
//       "hidden") {
//       let json = response.data.data.timings;
//       console.log(json);
//     }
//   });
//   axios
//   .get(
//     "https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Homs&country=Syria"
//   )
//   .then((response) => {

// if (document.getElementById("slide2").style.visibility ==
//       "hidden") {
//       let json = response.data.data.timings;
//       console.log(json);
//     }
// })
