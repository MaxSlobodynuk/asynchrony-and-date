import Notiflix from 'notiflix';

const form = document.querySelector(".form");
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay})
      }
    }, delay);
  })
}

function onFormSubmit(e) {
  e.preventDefault()

  const delayEl = document.querySelector('form input[name="delay"]');
  const stepEl = document.querySelector('form input[name="step"]');
  const amountEl = document.querySelector('form input[name="amount"]');


  const delay = parseInt(delayEl.value);
  const step = parseInt(stepEl.value);
  const amount = parseInt(amountEl.value);
  
for (let i = 1; i <= amount; i++) {
  createPromise(i, delay + (i - 1) * step )
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
e.currentTarget.reset();
}


