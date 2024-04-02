document.addEventListener('DOMContentLoaded', () => {
  new Lightpick({
    field: document.getElementById('datepicker'),
    singleDate: !1,
    numberOfColumns: 2,
    numberOfMonths: 2
  })

  setCheckBoxState()
  getItems()
  setCalendarState()
})

const calendar = document.getElementById('calendar')

function setCheckBoxState() {
  // Получение необходимых элементов из DOM
  const hiddenInputPlace = document.getElementById('hidden_input_place')
  const searchPlaceInput = document.getElementById('search_place_input')
  const hiddenInputPrice = document.getElementById('hidden_input_price')
  const searchPriceInput = document.getElementById('search_price_input')
  const hiddenInputDate = document.getElementById('hidden_input_date')
  const calendar = document.getElementById('calendar')
  const hiddenInputName = document.getElementById('hidden_input_name')
  const searchInput = document.getElementById('search_input')

  // Установка значений элементов, если они не равны null
  if (hiddenInputPlace.value !== null) {
    searchPlaceInput.value = hiddenInputPlace.value
  }
  if (hiddenInputPrice.value !== null) {
    searchPriceInput.value = hiddenInputPrice.value
  }
  if (hiddenInputDate.value !== null) {
    calendar.value = hiddenInputDate.value
  }
  if (hiddenInputName.value !== null) {
    searchInput.value = hiddenInputName.value
  }

  // Получение чекбоксов из DOM
  const allPlace = document.getElementById('allPlace')
  const online = document.getElementById('online')
  const isFree = document.getElementById('isFree')
  const isNotFree = document.getElementById('isNotFree')

  // Установка состояния чекбоксов на основе значений hidden input
  if (hiddenInputPlace.value === allPlace.value) {
    allPlace.checked = true
  }
  if (hiddenInputPlace.value === online.value) {
    online.checked = true
  }
  if (hiddenInputPrice.value === isFree.value) {
    isFree.checked = true
  }
  if (hiddenInputPrice.value === isNotFree.value) {
    isNotFree.checked = true
  }
}

function getItems() {
  document.getElementById('search_input').addEventListener('click', event => {
    // Выбираем список элементов
    const searchInputList = document.querySelector('.js-search_input_list')
    const searchItems = searchInputList.querySelectorAll('.search_input-list_item')

    // Отображаем первые 7 элементов, остальные скрываем
    searchItems.forEach((item, index) => {
      if (index < 7) {
        item.style.display = ''
      } else {
        item.style.display = 'none'
      }
    })
  })
}

function filterSearchResults() {
  let searchInput = document.getElementById('search_input')
  let searchText = searchInput.value.toUpperCase()

  let searchList = document.getElementById('search_input_list')
  let listItems = searchList.getElementsByTagName('li')

  for (let i = 0; i < listItems.length; i++) {
    let link = listItems[i].getElementsByTagName('a')[0]
    let linkText = link.innerHTML.toUpperCase()

    if (linkText.indexOf(searchText) > -1) {
      listItems[i].style.display = ''
    } else {
      listItems[i].style.display = 'none'
    }
  }
}

function setCalendarState() {
  // Обработчик клика по элементу calendar
  calendar.addEventListener('click', e => {
    e.target.classList.toggle('open-calendar')

    // Показать/скрыть lightpick в зависимости от наличия класса open-calendar
    if (e.target.classList.contains('open-calendar')) {
      document.querySelector('.lightpick').classList.remove('is-hidden')
    } else {
      document.querySelector('.lightpick').classList.add('is-hidden')
    }
  })
}

// Функция обработки кликов на документе
function handleDocumentClick(e) {
  const searchPlaceInput = document.getElementById('search_place_input')
  const searchPriceInput = document.getElementById('search_price_input')
  const searchInputListPlace = document.getElementById('search_input_list_place')
  const searchInputListPrice = document.getElementById('search_input_list_price')
  const lightpick = document.querySelector('.lightpick')

  if (e.target === searchPlaceInput) {
    searchInputListPlace.classList.toggle('show')
    searchInputListPrice.classList.remove('show')
  } else if (e.target === searchPriceInput) {
    searchInputListPrice.classList.toggle('show')
    searchInputListPlace.classList.remove('show')
  } else {
    if (e.target.closest('.search_input_container-price_item') || e.target.closest('.search_input_container-place_item')) {
      return
    }
    searchInputListPrice.classList.remove('show')
    searchInputListPlace.classList.remove('show')
  }

  if (lightpick.classList.contains('is-hidden')) {
    calendar.classList.remove('open-calendar')
  }
}

document.addEventListener('click', handleDocumentClick);

// Функция обработки кликов на элементе search_place_input
function handleSearchPlaceInputClick(e) {
  const searchInputPlace = document.getElementById('search_input_place')
  const allPlace = document.getElementById('allPlace')
  const online = document.getElementById('online')

  allPlace.addEventListener('click', () => {
    if (allPlace.checked) {
      e.target.value = allPlace.value
      online.checked = false
    } else {
      e.target.value = ''
    }
  })

  online.addEventListener('click', () => {
    if (online.checked) {
      e.target.value = online.value
      allPlace.checked = false
    } else {
      e.target.value = ''
    }
  })

  searchInputPlace.addEventListener('click', () => {
    allPlace.checked = false
    online.checked = false
    e.target.value = searchInputPlace.value
  })

  searchInputPlace.addEventListener('change', () => {
    allPlace.checked = false
    e.target.value = searchInputPlace.value
  })

  if (allPlace.checked || online.checked) {
    e.target.value = ''
  }

  if (online.checked) {
    allPlace.checked = false
  }
}

document.getElementById('search_place_input').addEventListener('click', handleSearchPlaceInputClick);

// Функция обработки кликов на элементе search_price_input
function handleSearchPriceInputClick(event) {
  const isFree = document.getElementById('isFree')
  const isNotFree = document.getElementById('isNotFree')

  function handleCheckboxClick(checkbox1, checkbox2) {
    checkbox1.addEventListener('click', () => {
      if (checkbox1.checked) {
        event.target.value = checkbox1.value
        checkbox2.checked = false
      } else {
        event.target.value = ''
      }
    })
  }

  handleCheckboxClick(isNotFree, isFree)
  handleCheckboxClick(isFree, isNotFree)

  if (!isFree.checked && !isNotFree.checked) {
    event.target.value = ''
  }
}

document.getElementById('search_price_input').addEventListener('click', handleSearchPriceInputClick);
