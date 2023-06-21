This is to reproduce an issue where as of Next.js v13.3.0 + dd-trace v4.2.0, the request hook from the dd-trace NextJS plugin is called twice:

```
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

```

Output:
```
request {
  'service.name': 'my-blog',
  service: 'node',
  env: undefined,
  version: undefined,
  'runtime-id': 'fe39b688-f82b-4cb2-899d-ce052591272f',
  component: 'next',
  'resource.name': 'GET',
  'span.type': 'web',
  'span.kind': 'server',
  'http.method': 'GET',
  '_dd.measured': true,
  'http.status_code': 200
} /test
request {
  'service.name': 'my-blog',
  service: 'node',
  env: undefined,
  version: undefined,
  'runtime-id': 'e9c83619-c256-48d1-ac33-394ec8d488b6',
  component: 'next',
  'resource.name': 'GET /test',
  'span.type': 'web',
  'span.kind': 'server',
  'http.method': 'GET',
  '_dd.measured': true,
  'next.page': '/test',
  'http.status_code': 200
} /test

```

To reproduce:
```
cd nextjs-blog && yarn dev
curl http://localhost:3000/test
```
