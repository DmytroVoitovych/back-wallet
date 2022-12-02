const app = require('./app');
const moongose = require('mongoose');
const { DBHOST,PORT=3000 } = process.env;


moongose.connect(DBHOST).then(() => app.listen(PORT, () => {
  
  console.log("Server running. Use our API on port: 3006");
  console.log("Database connection successful");

})).catch(err => { console.log(err.message); process.exit(1);}); // закрываем процес с неопределенной ошибкой


