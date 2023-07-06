/* eslint-disable prettier/prettier */
import { Router } from 'app/routes/router';
import { NewCar } from 'entities/Car/ui/new-car';
import { Home } from 'pages/Garage/Garage';

(document.getElementById('app') as HTMLElement).append(new NewCar().node);
