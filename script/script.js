"use strict";

function addSearchClickListener() {
  document.getElementById("search_input").addEventListener("click", event => {
    // Выбираем список элементов
    const searchInputList = document.querySelector(".js-search_input_list");
    const searchItems = searchInputList.querySelectorAll(".search_input-list_item");
    const searchInput = document.getElementById("search_input");

    if (searchInput.value) {
      filterSearchResults();
    } else {
      searchItems.forEach((item, index) => {
        if (index < 7) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    }
  });
}

function filterSearchResults() {
  const searchInput = document.getElementById("search_input");
  const searchText = searchInput.value.toUpperCase();

  const searchList = document.getElementById("search_input_list");
  const listItems = searchList.getElementsByTagName("li");

  for (let i = 0; i < listItems.length; i++) {
    const link = listItems[i].getElementsByTagName("a")[0];
    const text = link.text?.toUpperCase();

    if (text.indexOf(searchText) > -1) {
      listItems[i].style.display = "";
    } else {
      listItems[i].style.display = "none";
    }
  }
}

// Функция обработки кликов на документе
function handleDocumentClick(e) {
  const searchPlaceInput = document.getElementById("search_place_input");
  const searchPriceInput = document.getElementById("search_price_input");
  const searchInputListPlace = document.getElementById("search_input_list_place");
  const searchInputListPrice = document.getElementById("search_input_list_price");

  if (e.target === searchPlaceInput) {
    searchInputListPlace.classList.toggle("show");
    searchInputListPrice.classList.remove("show");
  } else if (e.target === searchPriceInput) {
    searchInputListPrice.classList.toggle("show");
    searchInputListPlace.classList.remove("show");
  } else {
    if (e.target.closest(".search_input_container-price_item") || e.target.closest(".search_input_container-place_item")) {
      return;
    }
    searchInputListPrice.classList.remove("show");
    searchInputListPlace.classList.remove("show");
  }
}


// Функция обработки кликов на элементе search_place_input
function handleSearchPlaceInputClick(e) {
  const inputPlace = document.getElementById("search_input_place");
  const placeAll = document.getElementById("allPlace");
  const placeOnline = document.getElementById("online");

  placeAll.addEventListener("click", () => {
    if (placeAll.checked) {
      e.target.value = placeAll.value;
      placeOnline.checked = false;
    } else {
      e.target.value = "";
    }
  }, {once: true});

  placeOnline.addEventListener("click", () => {
    if (placeOnline.checked) {
      e.target.value = placeOnline.value;
      placeAll.checked = false;
    } else {
      e.target.value = "";
    }
  }, {once: true});

  inputPlace.addEventListener("click", () => {
    placeAll.checked = false;
    placeOnline.checked = false;
    e.target.value = inputPlace.value;
  }, {once: true});

  inputPlace.addEventListener("change", () => {
    placeAll.checked = false;
    e.target.value = inputPlace.value;
  }, {once: true});

  (placeAll.checked || placeOnline.checked) && (inputPlace.value = "");
  placeOnline.checked && (placeAll.checked = false);
}

// Функция обработки кликов на элементе search_price_input
function handleSearchPriceInputClick(event) {
  const isFree = document.getElementById("isFree");
  const isNotFree = document.getElementById("isNotFree");

  function handleCheckboxClick(checkbox1, checkbox2) {
    checkbox1.addEventListener("click", () => {
      if (checkbox1.checked) {
        event.target.value = checkbox1.value;
        checkbox2.checked = false;
      } else {
        event.target.value = "";
      }
    }, {once: true});
  }

  handleCheckboxClick(isNotFree, isFree);
  handleCheckboxClick(isFree, isNotFree);

  if (!isFree.checked && !isNotFree.checked) {
    event.target.value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Lightpick({
    field: document.getElementById("datepicker"), singleDate: false, numberOfColumns: 2, numberOfMonths: 2, autoclose: true, hideOnBodyClick: true
  });

  addSearchClickListener();
  document.getElementById("search_price_input").addEventListener("click", handleSearchPriceInputClick);
  document.getElementById("search_place_input").addEventListener("click", handleSearchPlaceInputClick);
  document.addEventListener("click", handleDocumentClick);

  const locationUrl = new URL(location.href);
  const searchParams = locationUrl.searchParams;

  if (searchParams) {
    const place = document.getElementById("search_place_input");
    const price = document.getElementById("search_price_input");
    const date = document.getElementById("datepicker");
    const searchInput = document.getElementById("search_input");

    if (searchParams.has("name")) {
      const searchName = searchParams.get("name");
      searchInput.value = searchName || "";
    }

    if (searchParams.has("date")) {
      const searchDate = searchParams.get("date");
      date.value = searchDate || "";
    }

    if (searchParams.has("place")) {
      const searchPlace = searchParams.get("place");

      if (searchPlace) {
        const placeAll = document.getElementById("allPlace");
        const placeOnline = document.getElementById("online");

        if (searchPlace === placeAll.value) {
          placeAll.checked = true;
          place.value = placeAll.value;
        } else if (searchPlace === placeOnline.value) {
          placeOnline.checked = true;
          place.value = placeOnline.value;
        } else {
          place.value = searchPlace;
          document.querySelector("#search_input_place").value = searchPlace;
        }
      }
    }

    if (searchParams.has("price")) {
      const searchPrice = searchParams.get("price");
      if (searchPrice) {
        const coastFree = document.getElementById("isFree");
        const coastNotFree = document.getElementById("isNotFree");

        if (searchPrice === coastFree.value) {
          coastFree.checked = true;
          price.value = coastFree.value;
        } else if (searchPrice === coastNotFree.value) {
          coastNotFree.checked = true;
          price.value = coastNotFree.value;
        }
      }
    }
  }
});
