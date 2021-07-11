const form = document.querySelector('.ad-form');
const formElements = Array.from(form.querySelectorAll('fieldset'));
const filter = document.querySelector('.map__filters');
const filterSelectElements = Array.from(filter.querySelectorAll('select'));
const filterFieldsetElements = Array.from(filter.querySelectorAll('fieldset'));
const filterElements = filterSelectElements.concat(filterFieldsetElements);

const activateForm = () => {
  formElements.forEach((element) => {
    element.disabled = false;
  });
  filterElements.forEach((element) => {
    element.disabled = false;
  });
  form.classList.remove('ad-form--disabled');
  filter.classList.remove('map__filters--disabled');
}

const deactivateForm = () => {
  formElements.forEach((element) => {
    element.disabled = true;
  });
  filterElements.forEach((element) => {
    element.disabled = true;
  });
  form.classList.add('ad-form--disabled');
  filter.classList.add('map__filters--disabled');
}

const roomNumberSelect = form.querySelector("#room_number");
const capacitySelect = form.querySelector("#capacity");

const timein = form.querySelector("#timein");
const timeout = form.querySelector("#timeout");

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

const capacityNotForGuests = capacitySelect.querySelector('option[value="0"]');
const capacity1Guests = capacitySelect.querySelector('option[value="1"]');
const capacity2Guests = capacitySelect.querySelector('option[value="2"]');
const capacity3Guests = capacitySelect.querySelector('option[value="3"]');

const disableCapacityOptions = () => {
  capacityNotForGuests.disabled = true;
  capacity1Guests.disabled = true;
  capacity2Guests.disabled = true;
  capacity3Guests.disabled = true;
}

const validation = {
  1: () => {
    capacity1Guests.disabled = false;
    capacity1Guests.selected = true;
  },
  2: () => {
    capacity1Guests.disabled = false;
    capacity2Guests.disabled = false;
    capacity1Guests.selected = true;
  },
  3: () => {
    capacity1Guests.disabled = false;
    capacity2Guests.disabled = false;
    capacity3Guests.disabled = false;
    capacity1Guests.selected = true;
  },
  100: () => {
    capacityNotForGuests.disabled = false;
    capacityNotForGuests.selected = true;
  },
}

const validateGuests = () => {
  const selectedOption = roomNumberSelect.options[roomNumberSelect.selectedIndex];
  disableCapacityOptions();
  validation[selectedOption.value]();
}

roomNumberSelect.addEventListener('change', validateGuests);

export { activateForm, deactivateForm, validateGuests };