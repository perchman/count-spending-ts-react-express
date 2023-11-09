const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

//Cost
app.get('/costs');
app.post('/costs');
app.put('/costs');
app.delete('/costs');

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));