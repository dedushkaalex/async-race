/* eslint-disable prettier/prettier */
import { Router } from 'app/routes/router';
import { Home } from 'pages/Home/Home';

new Router();
document.body.prepend(Home.node);
