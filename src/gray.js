  (function () {
  var body = document.body;
  body.style['filter'] = 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)';
  if (!body.style['filter']) {
       body.style['-webkit-filter'] = 'grayscale(1)';
       body.style['filter'] = 'grayscale(1)';
     }
    }()
  )