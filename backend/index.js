const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000
const v1Router = require("./routes/index")
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/v1",v1Router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})