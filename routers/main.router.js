import { Router } from "express";

import Main from '../controllers/main.controller.js'
import { MasterSearch } from "../controllers/main.controller.js";
import validator from '../helpers/input.validation.js'
const mastersearch = new MasterSearch(); 
const router = new Router();

router.get('/', Main.signUpPage);
router.get('/home', Main.listPage);
router.get('/add', Main.addPage);
router.get('/edit/:id', Main.editPage);
router.get('/delete/:id', Main.delete);
router.get('/stat', Main.statPage);

router.post('/', Main.signUp);
router.post('/edit/:id', Main.edit);
router.post('/add', validator.InputValidation, Main.add );
router.post('/datasearch', Main.searchresult);
router.post('/mastersearch', mastersearch.masterSearch);
router.post('/masterstatdownloadexcel', mastersearch.masterStatDownloadExcell);




export default router