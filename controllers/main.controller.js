import Order from '../models/order.model.js'
import mongoose from 'mongoose';
import XLSX from 'xlsx';
class Main {
    signUpPage(req, res) {
        res.render('main/signup');
    }
    signUp(req, res) {
        if(req.body.name === "Shamsiddin" && req.body.sure == "Zayniddin") {
            res.redirect('/home')
        }else if(req.body.password == "Muazzam05") {
            res.redirect('/home')
        }else {
            res.redirect('/')
        }
    }
    async listPage(req, res) {
        const nosort = await Order.find().sort({"createdAt": -1});
        res.render('main/home', { clients:nosort });  
    }
    addPage(req, res) {
        res.render('main/add');
    }
    async add(req, res) {
        await Order.create(req.body);
        req.flash("success", "Yangi buyurtma qo'shildi !");
        res.redirect('/home');
    }  
    async editPage(req, res) {
        const _id = req.params.id;
        const data = await Order.findById(_id);
        res.render('main/edit', { data });
    }
    async edit(req, res) {
        const id = req.params.id;
        const dates = req.body;
        await Order.findByIdAndUpdate(id, dates);
        req.flash("success", "Tahrirlandi !");
        res.redirect('/home');
    }
    async delete(req, res) { 
        const id = req.params.id;
        await Order.findByIdAndDelete(id);
        res.redirect('/home');
    }
    async searchresult(req, res) {
        let search = req.body.datasearch;
        let result = await Order.find({ day:search });
        if (result.length !== 0) {
            res.render("main/searchresult", { title:"Natijalar", dataresult:result});
        } else {
            res.render("main/searchresult", { title:"Natijalar", dataresult:0});
        }
    }
    isAuth(req, res, next) {
        if (!req.session.user) {
            return res.redirect("/");
        } else {
            next();
        }
    }
    async statPage(req, res) {
        const data  = await Order.find();
        let summa = await Order.aggregate([{ $group: { _id: 'cost', total: { $sum: '$cost' } } }])
        res.render('main/stat', {data, summa}); 
        
    }
        
}
export default new Main()

export class MasterSearch {
    async masterStatDownloadExcell(req, res) {
        let search = req.body.mastersearch;
        const result = await Order.find({ mastername:search });
        var wb = XLSX.utils.book_new(); //new workbook
        Order.find((err,result)=>{
            if(err){
                console.log(err)
            }else{
                var temp = JSON.stringify(result);
                temp = JSON.parse(temp);
                var ws = XLSX.utils.json_to_sheet(temp);
                var down = '../public/Usta.xlsx'
               XLSX.utils.book_append_sheet(wb,ws,"sheet1");
               XLSX.writeFile(wb,down);
               res.download(down);
            }
        });
    }
    async masterSearch(req, res) {
        let search = req.body.mastersearch;
        const result = await Order.find({ mastername:search });
        if (result.length !== 0) {
            res.render("main/mastersearch", { title:"Natijalar", dataresult:result});
        } else {
            res.render("main/mastersearch", { title:"Natijalar", dataresult:0});
        }
    }
}
