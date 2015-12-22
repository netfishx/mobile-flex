(function () {
  var doc = window.document
  var docEl = doc.documentElement
  var metaEl = doc.querySelector('meta[name="viewport"]')
  var dpr = window.devicePixelRatio || 1
  var scale = 1 / dpr
  var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';
  var tid

  if (metaEl) {
    metaEl.setAttribute('content', content);
  }
  else {
    metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', content);
    document.head.appendChild(metaEl);
  }


  function refreshRem() {
    var width = docEl.getBoundingClientRect().width
    var rem = width / 10
    docEl.style.fontSize = rem + 'px'
  }

  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px'
  } else {
    doc.addEventListener('DOMContentLoaded', function () {
      doc.body.style.fontSize = 12 * dpr + 'px'
    }, false)
  }

  refreshRem()
})()