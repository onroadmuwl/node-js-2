const express = require('express');
const mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'demo'
});
var router = express.Router();
router.get('/get_form', (req, res) => {
    db.query(`SELECT * FROM commodity`, (err, data) => {
        if (err) {
            res.status(500).send('database error').end()
        } else {
            res.send(data).end();
        }
    })
});
router.get('/', (req, res) => {
        res.render('indexs', { path: 'indexs.html' });
    })
    //新增
router.post('/form_add', (req, res) => {
        var datas = req.body;
        db.query(`INSERT INTO commodity (code,name,price,company) VALUES ('${datas.code}','${datas.name}','${datas.price}','${datas.company}')`, (err, data) => {
            if (err) {
                res.send({ msg: 'wrong' }).end();
                throw err;
            } else {
                res.status(200).send({ msg: 'success' }).end();
            }
        })
    })
    //修改
router.post('/form_update', (req, res) => {
        var datas = req.body;
        db.query(`UPDATE commodity SET code='${datas.code_e}',name='${datas.name_e}',price='${datas.price_e}',company='${datas.company_e}' WHERE id='${datas.id_e}'`, (err, data) => {
            if (err) {
                res.send({ msg: 'wrong' }).end();
                throw err;
                //res.status(500).send('数据库错误').end();
            } else {
                res.send({ msg: 'success' }).end();
            }
        })
    })
    //删除
router.post('/form_del', (req, res) => {
    db.query(`DELETE FROM commodity WHERE id='${req.body.id}'`, (err, data) => {
        if (err) {
            //最好不要加上状态信息，尤其是出错的状态信息，否则ajax返回数据会直接报错
            //res.status(400).send({ msg: 'wrong' }).end();
            res.send({ msg: 'wrong' }).end();
        } else {

            res.send({ msg: 'success' }).end()
        }
    })
})
module.exports = router;