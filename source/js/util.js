const ALERT_SHOW_TIME = 5000;
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

export const ADS_COUNT = 10;
export const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) return -1;

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomFloat = (min, max, float) => {
  if (min < 0 || max < 0) return -1;

  if (max < min) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min) + min).toFixed(float);
}

export const getRandomArrayElement = (array) => {
  return array[getRandomInt(1, array.length - 1)];
}

export const makeRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export const makeRandomArrayGenerator = (array) => {
  const result = [];
  const count = getRandomInt(1, array.length - 1);

  for(let i = 0; i < count; i++) {
    result.push(array[getRandomInt(0, array.length - 1)]);
    array = array.filter(el => !result.includes(el));
  }

  return result.sort();
};

export const showSuccess = (onSuccess) => {
  const container = successTemplate.cloneNode(true);

  document.body.append(container);

  setTimeout(() => {
    container.remove();
    onSuccess();
  }, ALERT_SHOW_TIME);
};

export const showAlert = (message) => {
  const container = errorTemplate.cloneNode(true);

  container.querySelector('.error__message').textContent = message;
  container.querySelector('.error__button').addEventListener('click', () => {
    container.remove();
  });

  document.body.append(container);
};

export const debounce = (cb, delay) => {
  let timeout;
  return (...data) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb.apply(this, data), delay);
  }
}
