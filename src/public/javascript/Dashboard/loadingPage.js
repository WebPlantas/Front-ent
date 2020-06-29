var mathIframeOrigins = {
  math: 'https://math-app.achieve3000.com',
  'math-staging': 'https://math-app-staging.achieve3000.com',
  'localhost:5002': 'http://localhost:5001',
};

function showLoadingPage() {
  var subdomain = location.host.split('.').shift();
  var isMath = Object.keys(mathIframeOrigins).indexOf(subdomain) !== -1;
  var image = document.createElement('img');

  if (isMath) {
    document.body.classList.add('isMath');
    document.querySelector('#loading .textContainer').innerText = 'Loading...';
    image.src = mathIframeOrigins[subdomain] + '/logo512.png';
  }
  else {
    image.src = '/img/Actively_Loading.png';
  }

  document.querySelector('#loading .imageContainer').appendChild(image);
};