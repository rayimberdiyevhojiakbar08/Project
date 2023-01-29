import express from 'express';
import layout from 'express-ejs-layouts'
import router from './routers/main.router.js';

const app =  express()
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(layout);
app.use(router);
app.listen(3000, () => console.log('𝕊𝕖𝕣𝕧𝕖𝕣 𝕚𝕤 𝕣𝕦𝕟𝕟𝕚𝕟𝕘 ℙ𝕠𝕣𝕥:𝟛𝟘𝟘𝟘'));
