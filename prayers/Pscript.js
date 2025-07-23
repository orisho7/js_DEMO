var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function fillPrayers(wich) {
  document.getElementById("Fajr").textContent = wich.Fajr;
  document.getElementById("Duhur").textContent = wich.Dhuhr;
  document.getElementById("Asr").textContent = wich.Asr;
  document.getElementById("Maghrib").textContent = wich.Maghrib ;
  document.getElementById("Isha").textContent = wich.Isha;
}

// Initial load for Syria
axios
  .get("https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Homs&country=Syria")
  .then((response) => {
    fillPrayers(response.data.data.timings);
  });

swiper.on("slideChange", function () {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const country = activeSlide.getAttribute("data-country");
  if (country === "Syria") {
    axios
      .get("https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Homs&country=Syria")
      .then((response) => {
        fillPrayers(response.data.data.timings);
      });
  } else if (country === "SA") {
    axios
      .get("https://api.aladhan.com/v1/timingsByCity/21-07-2025?city=Riyadh&country=Saudi Arabia")
      .then((response) => {
        fillPrayers(response.data.data.timings);
      });
  } else {
    fillPrayers({});
    console.log("not found");
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
