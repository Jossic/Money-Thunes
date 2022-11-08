export function dateParser(value) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  let date = new Date(value).toLocaleDateString('fr-FR', options);
  return date.toString();
}

export function getMonth() {
  let date = new Date(Date.now());
  return date.getMonth();
}

export function getYear() {
  let date = new Date(Date.now());
  return date.getFullYear();
}

export function orderByDate(array) {
  return array.sort((previous, next) => Date.parse(previous.date) - Date.parse(next.date));
}

export function convertMonth(value) {
  switch (value) {
    case 1:
      value = 'Janvier';
      break;
    case 2:
      value = 'Février';
      break;
    case 3:
      value = 'Mars';
      break;
    case 4:
      value = 'Avril';
      break;
    case 5:
      value = 'Mai';
      break;
    case 6:
      value = 'Juin';
      break;
    case 7:
      value = 'Juillet';
      break;
    case 8:
      value = 'Août';
      break;
    case 9:
      value = 'Septembre';
      break;
    case 10:
      value = 'Octobre';
      break;
    case 11:
      value = 'Novembre';
      break;
    case 12:
      value = 'Décembre';
      break;
  }
  return value;
}

export function shortDate(value) {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  let date = new Date(value).toLocaleDateString('fr-FR', options);
  return date.toString();
}
