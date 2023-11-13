const express = require('express');
import categoryRouter  from './routers/category-router';

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/categories', categoryRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));