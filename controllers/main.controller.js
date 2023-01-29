import Order from '../models/order.model.js'
import xlsx from 'xlsx'
import path from 'path'
class Main {
    signUpPage(req, res) {
        res.render('main/signup');
    }
    signUp(req, res) {
        if(req.body.name === "Hojiakbar" && req.body.sure == "Rayimberdiyev") {
            res.redirect('/home')
        }else if(req.body.email == "rayimberdiyevhojiakbar08@gmail.com" && req.body.password == "hojiakbar") {
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
         res.redirect('/home');
    }  
    async editPage(req, res) { //optomPage
        const _id = req.params.id;
        const data = await Order.findById(_id);
        res.render('main/edit', { data });
    }
    async edit(req, res) {     //optom
        const id = req.params.id;
        const dates = req.body;
        await Order.findByIdAndUpdate(id, dates);
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
    downloadExcell(req, res) {
        
    }
        
}
export default new Main()