const showTime = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  document.getElementById('clock').innerHTML = `${hour}:${minutes}`;
  setTimeout(showTime, 60000);
}

window.addEventListener('load', showTime);
