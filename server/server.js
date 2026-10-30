const { app } = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`api http://localhost:${port}`);
  console.log('admin / admin@shop.local / admin123');
  console.log('buyer / user@shop.local / user123');
});
