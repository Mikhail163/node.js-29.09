const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');


const app = express();
app.use(cookieParser());

//каким образом создается session_id
app.use(session({ keys: ['secret'] })); 

app.use((req, res) => {
  // считаем количество просмотренных страниц
  // вся фишка в том - что сервер 
  let n = req.session.views || 0;
  req.session.views = ++n;
  
  res.send(`${n} views`);
});

app.listen(3000);