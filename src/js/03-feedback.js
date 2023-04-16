import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
let formData = {};
const STORAGE_KEY = 'feedback-form-state';

checkLocalStorage();

formRef.addEventListener('input', throttle(getInputsValue, 500));
formRef.addEventListener('submit', formSubmit);

function getInputsValue(e) {
  formData[e.target.name] = e.target.value;
  const inputData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, inputData);
}

function formSubmit(e) {
  e.preventDefault();
  if (formRef.email.value === '' || formRef.message.value === '') {
    alert('Всі поля повинні бути заповнені!!');
    return;
  }
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function checkLocalStorage() {
  const localStorageValue = localStorage.getItem(STORAGE_KEY);
  if (localStorageValue) {
    formData = JSON.parse(localStorageValue);
    formRef.email.value = formData.email ? formData.email : '';
    formRef.message.value = formData.message ? formData.message : '';
  }
}
