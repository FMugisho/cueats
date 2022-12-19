const data = { foo: "bar", hello: "world" };

fetch('https://yourdomain.com/yourendpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Yay the request was sent:', data);
  })
  .catch((error) => {
    console.error('Oops something went wrong while sending request:', error);
  });
