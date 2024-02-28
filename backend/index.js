const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000
const userRouter = require("./routes/index")
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/app/v1",userRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})