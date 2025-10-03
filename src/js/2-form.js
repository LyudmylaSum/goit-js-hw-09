const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

function loadFormState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      formData = {
        email: parsedState.email || '',
        message: parsedState.message || '',
      };

      form.elements.email.value = formData.email.trim();
      form.elements.message.value = formData.message.trim();
    } catch (error) {
      console.error('Error parsing localStorage state:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

form.addEventListener('input', handleFormInput);

function handleFormInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trim();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
}

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  form.reset();
}
loadFormState();
