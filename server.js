const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api',(reg,res)=>{
  axios.get('https://www.google.com/')
    .then(response=>{
      console.log('retrieved data');
      res.json({'user': 'hello'});
    })
    .catch(response=>{ console.log(response)})
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
