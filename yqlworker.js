(function YQLWorker(exports) {
  'use strict';

  const URL_TEMPLATE = 'https://query.yahooapis.com/v1/public/yql?' +
    'q=%QUERY%&diagnostics=false&format=json';
  const QUERY_TEMPLATE = 'use "store://CX9Ihtj3KlfcI9ZkuDx7rx" as Worker;' +
    ' select * from Worker where worker_src="%SCRIPT%"';

  function YQLWorker(scriptSrc) {
    this.query = QUERY_TEMPLATE.replace('%SCRIPT%', scriptSrc);
  }

  YQLWorker.prototype = {
    set onmessage(cb) {
      this.callback = cb;
    },
    set onerror(cb) {
      this.error = cb;
    },
    postMessage: function postMessage(msg) {
      if (msg) {
        this.query += ' AND message=\'' + JSON.stringify(msg) + '\'';
      }

      var url = URL_TEMPLATE.replace('%QUERY%', encodeURIComponent(this.query));
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = r => {
        var response = r.target;
        if (response.readyState === 4) {
          if (this.callback) {
            var result = response.response || response.responseText;
            try {
              // Parse the YQL response and try to get just the
              // results object from the original response.
              result = JSON.parse(response.response);
              if (result.query && result.query.results !== undefined) {
                result = result.query.results;
              }
            } catch(e) { console.info(e); }
            this.callback(result);
          }
        } else if (this.error) {
          this.error(r.target);
        }
      };
      xhr.onerror = e => {
        if (this.error) {
          this.error(e);
        }
      };
      xhr.send();
    }
  };

  exports.YQLWorker = YQLWorker;
})(this);
