import express from 'express';
import layout from 'express-ejs-layouts'
import router from './routers/main.router.js';
import excelModel from './models/order.model.js';
import XLSX from 'xlsx';
import validator from "express-validator";
import flash from "express-flash";
import session from "express-session";
const app =  express()
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(layout);
app.use(session({
    secret: "213sf345fgg234fgwsdgt324",
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    saveUninitialized:false,
    resave:false
}));
app.use(validator());

app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.flash() || [];
    if(req.url === "/") {
        res.locals.result = "";
    }else {
        res.locals.result = "1";
    }
    next();
});

app.use(router)

app.post('/exportdata',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    excelModel.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = './public/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});

app.listen(4000, () => console.log('𝕊𝕖𝕣𝕧𝕖𝕣 𝕚𝕤 𝕣𝕦𝕟𝕟𝕚𝕟𝕘 ℙ𝕠𝕣𝕥:4𝟘𝟘𝟘'));
