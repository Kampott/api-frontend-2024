const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (password) => {
  // Длина не менее 8 символов, наличие хотя бы одной буквы верхнего и нижнего регистра, цифры и специального символа
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return String(password).match(regExp);
}
export const validatePasswordRepeat = (passwordRepeat) => {
  const password = formValues['password'];
  return passwordRepeat === password;
}
export const validateNotEmpty = (value) => {
  return value.trim().length > 0;
}
export const validateEmail = (email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email)
      .toLowerCase()
      .match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every((validationStatus) => !!validationStatus);
}


export const setFormValue = (valueKey, newValue, validator, formType) => {
  formValues[valueKey] = newValue;

  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue);
  }

  const inputElement = document.getElementById(valueKey);
  const buttonElement = formType === 'sign_up'
      ? document.getElementById('sign_up_btn')
      : document.getElementById('sign_in_btn');


  if (inputElement) {
    if (formValidation[valueKey]) {
      inputElement.classList.remove('invalid');
      inputElement.classList.add('valid');
    } else {
      inputElement.classList.remove('valid');
      inputElement.classList.add('invalid');
    }
  }

  // Для кнопки SignUp и SignIn проверяем состояние всех полей этой формы
  if (buttonElement) {
    buttonElement.disabled = formType === 'sign_up'
        ? !getSignUpValidationStatus()
        : !getSignInValidationStatus();
  }
};

// Функция для проверки состояния валидации для формы Sign Up
export const getSignUpValidationStatus = () => {
  return ['first_name', 'last_name', 'email', 'password', 'password-repeat']
      .every(field => formValidation[field]);
}

// Функция для проверки состояния валидации для формы Sign In
export const getSignInValidationStatus = () => {
  return ['email-login', 'password-login']
      .every(field => formValidation[field]);
}



// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT");
    return false;
  }
  console.log("FORM IS FINE");
  console.log(formValues);
  return true;
}
