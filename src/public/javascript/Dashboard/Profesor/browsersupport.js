//IE 10 and below, mobile
function browserSupported() {
  if (typeof (bowser) !== 'undefined') {
    if (bowser.msie && bowser.version <= 10
      || bowser.safari && bowser.version <= 8
      || bowser.ios && bowser.osversion <= 8
      || bowser.firefox && bowser.version <= 26
      || bowser.chrome && bowser.version <= 37) {
      document.getElementById('browserblock').style.display = 'block';
      document.getElementById('root').style.display = 'none';
      return false;
    }
  }

  return true;
}