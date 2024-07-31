const http = require('http');
const express = require('express');
const app = express()

const port = 8000;

app.set('views', 'views');
app.set('view engine', 'ejs');

// https://expressjs.com/en/starter/static-files.html
// /public/index.html을 보여주기 위한 static 폴더 지정.
app.use(express.static('public'));

// localhost:8000/saram
app.get('/saram', function(req, res) {
    // ejs 페이지로 렌더링 
    // - views/saram.ejs 페이지의 코드를 읽어와서 res.end()에 적용한다.

    var message_data = "Hello world ㅋㅋㅋ";
    req.app.render('saram', {message_data}, function(err, html) {
        res.end(html);
    });
});

// app.get('/saram/update', function(req, res) {
//   console.log("GET - /saram/update >>> ", req.query);
//   // saramList에서 해당 정보를 찾아서 update 하기.
//   res.send(req.query);
// });

app.get('/saram/update', function(req, res) { // 김동영씨 코드..
  console.log("GET - /saram/update >>> ", req.query);
  // saramList에서 해당 정보를 찾아서 update 하기.
  var idx = saramList.findIndex(function(saram) {
      return saram.no == req.query.no;
  });
  var saram = null;
  if (idx!= -1) {
      saram = saramList[idx];
  }
  saram.name = req.query.name;
  saram.email = req.query.email;
  saram.job = req.query.job;
  saram.age = parseInt(req.query.age);
  
  res.send(req.query);
});

// localhost:8000/saram/update?no=103
app.get('/saram/update', function(req, res) {
  console.log('GET - /saram/update >>>> no: ' + req.query.no);
  var idx = saramList.findIndex(function(saram) {
      return saram.no == req.query.no;
  });
  var saram = req.query;
  if(idx != -1) {
      saramList[idx] = saram;
  }
  res.redirect('/saram');
})


// app.get('/saram/update', (req, res) => { // 준혁쿤 코드..
//   const updatedSaram = {
//       no: parseInt(req.query.no, 10),
//       name: req.query.name,
//       email: req.query.email,
//       job: req.query.job,
//       age: req.query.age,
//   };

//   const idx = saramList.findIndex((saram) => saram.no === updatedSaram.no);
//   if (idx === -1) {
//       res.status(404).send('사람을 찾을 수 없습니다.');
//       return;
//   }

//   saramList[idx] = updatedSaram;

//   // 업데이트 후 /saram/detail로 리디렉션
//   res.redirect(`/saram/detail?no=${updatedSaram.no}`);
// });



const server = http.createServer(app);
server.listen(port, function() {
    console.log("서버 실행 중 >>> http://localhost:"+port);
});


// 실제 웹 서버 구축에서는 Nodejs만 사용하지 않고 express를 더 많이 사용합니다.