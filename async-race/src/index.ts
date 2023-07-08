/* eslint-disable prettier/prettier */
// import { App } from 'app';
import '@styles/bulma.css';
import '@styles/global.scss';
import { RaceAPI } from 'api';
import { Router } from 'core/router/router';

console.log(RaceAPI.getCars());
console.log(RaceAPI.getCar(9239));

// (document.getElementById('app') as HTMLElement).append(new App().init());

new Router();
