const TWENTYFOURHOUR = false;

const padZero = num => `0${num}`.slice(-2);

const showTime = _ => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  document.getElementById('clock').innerHTML = `${hour}:${padZero(minutes)}`;
  setTimeout(showTime, 60000);
};

const numToText = num => {
  const TEXTS = [
    'midnight',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty'
  ];

  if (num <= 20) return TEXTS[num];

  const lastDigit = num % 10;
  return `${TEXTS[20]}&hyphen;${TEXTS[lastDigit]}`;
};

const getHour = hour =>
  TWENTYFOURHOUR ? hour : [0, 12].includes(hour) ? 12 : hour % 12;

const processHour = hour => numToText(getHour(hour));

const processMinutes = minutes => {
  const min = minutes > 30 ? 60 - minutes : minutes;
  const toPast = minutes =>
    minutes > 30
      ? '<span class="topass">to</span>'
      : '<span class="topass">past</span>';
  const isMinPlu = min => (min === 1 ? 'minute' : 'minutes');

  let text = '';
  if ([5, 10, 20].includes(min)) {
    text += `${numToText(min)}&nbsp;${toPast(minutes)}`;
  } else if (min === 15) {
    text += `a&nbsp;quarter&nbsp;${toPast(minutes)}`;
  } else if (min === 30) {
    text += `half&nbsp;${toPast(minutes)}`;
  } else {
    text += `${numToText(min)} ${isMinPlu(min)}&nbsp;${toPast(minutes)}`;
  }
  return text;
};

const timeToText = _ => {
  const now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  const $hour = document.getElementById('hour');
  const $minutes = document.getElementById('minutes');

  if (minutes === 0) {
    $hour.innerHTML = `${processHour(hour)}`;
    if (hour === 0) {
      $minutes.innerHTML = '';
    } else if (hour === 12) {
      $minutes.innerHTML = ' noon';
    } else {
      $minutes.innerHTML = ' <span class="topass">o\' </span>&nbsp;clock';
    }
  } else {
    if (minutes > 30) hour = hour + 1;
    $hour.innerHTML = `${processMinutes(minutes)}`;
    $minutes.innerHTML = ` ${processHour(hour)}`;
  }
  setTimeout(timeToText, 1000);
};

window.addEventListener('load', timeToText);
