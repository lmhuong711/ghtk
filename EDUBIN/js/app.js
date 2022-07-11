// Mobile menu
const menuMobileIconOpen = document.getElementById("header-menu-mobile-open");
const navMobile = document.getElementById("header-mobile");

menuMobileIconOpen.addEventListener("click", () => {
  if (navMobile.classList.contains("open-nav-menu")) {
    navMobile.classList.remove("open-nav-menu");
  } else {
    navMobile.classList.add("open-nav-menu");
  }
});

// Scroll button
const scrollPage = document.getElementById("scroll");
window.addEventListener("scroll", () => {
  let scrollLenghtY = window.scrollY;
  if (scrollLenghtY > 165) {
    scrollPage.style.opacity = "1";
    scrollPage.style.zIndex = "99";
  } else {
    scrollPage.style.opacity = "0";
    scrollPage.style.zIndex = "-99";
  }
});

// Show video
const video = document.getElementById("iframe-video");
document.getElementById("btn-play").addEventListener("click", () => {
  video.classList.add("show-video");
});
video.addEventListener("click", () => {
  video.classList.remove("show-video");
});

// Slider
const sliderImgFirst = document.getElementById("slider-img1");
const sliderImgSecond = document.getElementById("slider-img2");
const fadeFake1 = document.getElementById("bg-fake-fade1");
const fadeFake2 = document.getElementById("bg-fake-fade2");

sliderImgSecond.style.display = "none";

[document.getElementById("next-slide"), document.getElementById("pre-slide")].forEach(i => i.addEventListener("click", () => {
  sliderImgSecond.classList.toggle("active-slider");
  sliderImgFirst.classList.toggle("active-remove");
  fadeFake1.classList.add("bg-fake-fade");
  setTimeout(() => {
    fadeFake1.classList.remove("bg-fake-fade");
  }, 1000);
  fadeFake2.classList.add("bg-fake-fade");
  setTimeout(() => {
    fadeFake2.classList.remove("bg-fake-fade");
  }, 1000);
}))

function App() {
  getData(renderData);
}

App();

function getData(callBack) {
  fetch("https://60d4611a61160900173cb070.mockapi.io/courses", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(callBack)
    .catch((err) => {
      console.log(err);
    })
    .finally(console.log("Data Success !"));
}

function renderData(dataResult) {
  const exportData = dataResult.map((dataResult) => {
    let rateStar = "";
    for (var i = 1; i <= 5; i++) {
      if (i <= dataResult.rate) {
        rateStar += `<i class="fa-solid fa-star"></i>`;
      } else {
        rateStar += ` <i class="fa-regular fa-star"></i>`;
      }
    }
    return `  
    <div class="featured-contents-slides-content">
    <div class="featured-contents-slide">
        <div class="featured-course-price">
            <span>${dataResult.level}</span>
        </div>
        <div class="featured-course-bookmark">
            <span><i class="fa-regular fa-bookmark"></i></span>
        </div>
        <div class="featured-contents-slide-img">
            <img src="${dataResult.image}"
                alt="">
        </div>
        <div class="featured-contents-slide-review">
            <div class="featured-contents-slide-review-top">
                <div class="slide-review-rate">
                    <div class="slide-review-rate-star">
                       ${rateStar}
                    </div>
                    <div class="slide-review-rate-review">
                        <span>${dataResult.rate}</span>
                        <span>(${dataResult.rate_quantity})</span>
                    </div>
                </div>
                <h4>
                    <a href="">${dataResult.name}</a>
                </h4>
                <div class="featured-user-duration">
                    <span> <i class="ti-user"></i>${dataResult.total_enrolled}</span>
                    <span><i class="ti-time"></i>${dataResult.duration}</span>
                </div>
            </div>
            <div class="featured-contents-slide-review-middle">
                <div class="review-middle-img">
                    <img src="https://thepixelcurve.com/wp/edubin/wp-content/uploads/2019/03/t-3-1-5-100x100.jpg"
                        alt="">
                    <div class="review-middle-img-name">
                        <span class="sub">by</span>
                        <span><a href="">${dataResult.teacher}</a></span>
                        <span class="sub">in</span>
                        <span><a href="">${dataResult.categories}</a></span>
                    </div>
                </div>
            </div>
            <div class="featured-contents-slide-review-bottom">
                <div class="featured-cost">
                    <p>${dataResult.price}$</p>
                </div>
                <div class="featured-buy">
                    <a href=""><i class="fa-solid fa-cart-shopping"></i>Get
                        Enrolled</a href="">
                </div>
            </div>
        </div>
    </div>
</div>
    `;
  });
  const renderArea = document.getElementById("a1");
  renderArea.innerHTML += exportData.join("");

  $(".autoplay1").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow:
      "<button type='button' class='custom-slick-pre-course'><i class='ti-angle-left' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='custom-slick-next-course'><i class='ti-angle-right' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}

$(document).ready(function () {
  $(".autoplay").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow:
      "<button type='button' class='custom-slick custom-slick-pre'><i class='ti-angle-left' aria-hidden='true'></i></button>",
    nextArrow:
      "<button type='button' class='custom-slick-next'><i class='ti-angle-right' aria-hidden='true'></i></button>",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

$(document).ready(function () {
  $(".autoplay3").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

$(document).ready(function () {
  $(".autoplay4").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
