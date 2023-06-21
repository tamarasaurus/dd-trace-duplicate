const tracer = require('dd-trace').init();

tracer.use('next', {
  service: 'my-blog',
  hooks: {
    /* Executed when the request is finished but before API handlers are called */
    request: (
      span,
      request,
      response,
    ) => {
      console.log('request', span.context()._tags, request.url)
    },
  },
});
