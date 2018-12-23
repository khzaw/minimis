const padZero = num => `0${num}`.slice(-2);

const showTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  document.getElementById('clock').innerHTML = `${hour}:${padZero(minutes)}`;
  setTimeout(showTime, 60000);
}

window.addEventListener('load', showTime);
