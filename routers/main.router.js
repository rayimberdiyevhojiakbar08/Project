import { Router } from "express";

import Main from '../controllers/main.controller.js'
const router = new Router();

router.get('/', Main.signUpPage);
router.get('/home', Main.listPage);
router.get('/add', Main.addPage);
router.get('/edit/:id', Main.editPage);
router.get('/delete/:id', Main.delete);

router.post('/', Main.signUp);
router.post('/edit/:id', Main.edit);
router.post('/add', Main.add);
router.post('/datasearch', Main.searchresult);
router.post('/mastersearch', Main.masterSearch);




export default router