/* eslint-disable prettier/prettier */
// import { App } from 'app';
import '@styles/bulma.css';
import '@styles/global.scss';
import { RaceAPI } from 'api';
import { Router } from 'core/router/router';

const main = async (): Promise<void> => {
  console.log(
    await RaceAPI.getCars([
      { key: '_page', value: 0 }
      // { key: '_limit', value: 4 }
    ])
  );
  console.log(await RaceAPI.getCar(2));
  // await RaceAPI.createCar({
  //   name: 'tesla',
  //   color: 'red'
  // });

  // await RaceAPI.deleteCar(5);
  // await RaceAPI.updateCar(15, {
  //   name: 'Tesla Model X',
  //   color: '#e6e6fa',
  //   id: 1
  // });
  // console.log(await RaceAPI.startEngine(1));
  // console.log(await RaceAPI.driveEngine(1));
  // console.log(await RaceAPI.getWinners());
  // console.log(await RaceAPI.getWinner(1));
  // console.log(RaceAPI.deleteWinner(1))

  console.log(
    RaceAPI.createWinner({
      id: 1,
      wins: 1,
      time: 10,
    })
  );

  console.log(RaceAPI.updateWinner(1, {
    id: 1,
    wins: 1,
    time: 20,
  }))
};

main();

// (document.getElementById('app') as HTMLElement).append(new App().init());

new Router();
