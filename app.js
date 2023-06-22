const express = require('express');
const sequelize = require('./app/config/db');
const adminRouter=require('./app/routes/adminRoutes');
const errorControllers=require('./app/controllers/errorController');


const app = express();

app.use(express.json());
const port = 5000;

// Sync the models with the database
sequelize
  .sync({alter:true})
  .then(() => {
    console.log('Database connection successful')
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

  
app.use(adminRouter)

app.use(errorControllers);


  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });