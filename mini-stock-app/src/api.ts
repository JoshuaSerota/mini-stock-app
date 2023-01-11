const { express } = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');

const app = express();

//configure app here
const port = 3000

app.get("/api/test", (req: any, res: any) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
})
