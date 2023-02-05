class Validation {
    async InputValidation(req, res, next) {
        req.check('namesure').notEmpty().withMessage("Ism familya bo'sh bo'lmasin");
        req.check('adress').notEmpty().withMessage("Manzil bo'sh bo'lmasin");
        req.check('ordername').notEmpty().withMessage("Buyurtma nomi bo'sh bo'lmasin");
        req.check('mastername').notEmpty().withMessage("Usta ismi bo'sh bo'lmasin");
        req.check('ordertype').notEmpty().withMessage("Buyurtma turi bo'sh bo'lmasin");
        req.check('cost').notEmpty().withMessage("Narx bo'sh bo'lmasin");
        req.check('cost').isInt().withMessage("Narx raqam bo'lsin");
        req.check('number').notEmpty().withMessage("Telefon raqam bo'sh bo'lmasin");
        req.check('number').isInt().withMessage("Telefon raqam raqam bo'lsin");

        let errors = await req.getValidationResult();
        let errorsMsg = errors.array().map(obj => obj.msg);

        if (!errors.isEmpty()) {
            req.flash("errors", errorsMsg);
            res.redirect('/add');
        } else {
            next();
        }
    }
}

export default new Validation();