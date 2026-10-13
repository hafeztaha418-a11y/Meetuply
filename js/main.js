
var deadline = new Date("Dec 31, 2026 23:59:59").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var t = deadline - now;

  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((t % (1000 * 60)) / 1000);

  document.querySelector("#clockdiv .days").innerHTML = days;
  document.querySelector("#clockdiv .hours").innerHTML = hours;
  document.querySelector("#clockdiv .minutes").innerHTML = minutes;
  document.querySelector("#clockdiv .seconds").innerHTML = seconds;

  if (t < 0) {
    clearInterval(x);
    document.getElementById("clockdiv").innerHTML = "Event Started!";
  }
}, 1000);


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,    
  spaceBetween: 30,      
  loop: true,          
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let cards = document.querySelectorAll(".dat-card");
let filters = document.querySelectorAll(".filter-options input[type='checkbox']");
filters.forEach(filter => {
  filter.addEventListener("change", () => {
    let selected = {
      category: [],
      price: [],
      duration: []
    };

    document.querySelectorAll(".filter-group").forEach(group => {
      let title = group.getAttribute("data-group");
      let checked = group.querySelectorAll("input[type='checkbox']:checked");
      checked.forEach(ch => {
        let val = ch.getAttribute("data-catVal");
        if (val && selected[title]) selected[title].push(val);
      });
    });

    cards.forEach(card => {
      let match = true;
      let cardCategory = card.getAttribute("data-category") || "";
      let cardPrice = card.getAttribute("data-cate") || "";
      let cardDuration = card.getAttribute("data-duration") || "";

      if (selected.category.length > 0 && !selected.category.includes("All") && !selected.category.includes(cardCategory)) {
        match = false;
      }

      if (selected.price.length > 0 && !selected.price.includes("All") && !selected.price.includes(cardPrice)) {
        match = false;
      }

      if (selected.duration.length > 0 && !selected.duration.includes("All") && !selected.duration.includes(cardDuration)) {
        match = false;
      }

      card.style.display = match ? "block" : "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const plusBtn = document.querySelector(".qty-btn-plus");
  const minusBtn = document.querySelector(".qty-btn-minus");
  const qtyInput = document.querySelector(".input-qty");
  const priceDisplay = document.querySelector(".ao-ticket-count-price");
  const basePrice = parseFloat(priceDisplay.getAttribute("data-base-price"));
  let quantity = 0;
  const updatePrice = () => {
    const total = basePrice * quantity;
    priceDisplay.textContent = `$${total.toFixed(2)}`;
  };

  plusBtn.addEventListener("click", () => {
    quantity++;
    qtyInput.value = quantity;
    updatePrice();
  });

  minusBtn.addEventListener("click", () => {
    if (quantity > 0) {
      quantity--;
      qtyInput.value = quantity;
      updatePrice();
    }
  });
});


