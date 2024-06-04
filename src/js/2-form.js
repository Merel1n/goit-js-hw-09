const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('textarea');

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

form.addEventListener('input', () => {
  const formDataUser = new FormData(form);

  const email = formDataUser.get('email');
  const message = formDataUser.get('message');
  const formData = {
    email,
    message,
  };
  saveToLS('feedback-form-state', formData);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const formDataUser = new FormData(form);

  const email = formDataUser.get('email').trim();
  const message = formDataUser.get('message').trim();
  const formData = {
    email,
    message,
  };
  if (!email || !message) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    form.reset();
    localStorage.removeItem('feedback-form-state');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const formData = loadFromLS('feedback-form-state');

  form.elements.email.value = formData?.email ?? '';
  form.elements.message.value = formData?.message ?? '';
});
