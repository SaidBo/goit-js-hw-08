import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);

  const formDataJSON = JSON.stringify(formData);

  localStorage.setItem('STORAGE_KEY', formDataJSON);
}

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();

  if (
    refs.form.elements.email.value === '' ||
    refs.form.elements.message.value === ''
  ) {
    alert`Заповніть, будь ласка, всі поля`;
  }

  console.log(JSON.parse(localStorage.getItem('STORAGE_KEY')));

  evt.currentTarget.reset();
  localStorage.removeItem('STORAGE_KEY');
}

function populateTextarea() {
  const enteredData = JSON.parse(localStorage.getItem('STORAGE_KEY'));

  if (enteredData) {
    refs.form.elements.email.value = enteredData?.email || '';
    refs.form.elements.message.value = enteredData?.message || '';
    formData.email = enteredData.email;
    formData.message = enteredData.message;
  }
}

