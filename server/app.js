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

const server = http.createServer(app);
server.listen(port, function() {
    console.log("서버 실행 중 >>> http://localhost:"+port);
});

// 실제 웹 서버 구축에서는 Nodejs만 사용하지 않고 express를 더 많이 사용합니다.