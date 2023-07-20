import { RaceApi } from '@api/api';
import { ServerErrorCode } from '@api/enum';
import { Winner } from '@api/interface';

export async function saveWinner({
  id,
  time,
  carName,
  color
}: Pick<Winner, 'id' | 'time' | 'carName' | 'color'>): Promise<void> {
  try {
    const winnerCar: Winner = await RaceApi.getWinner(id);
    await RaceApi.updateWinner(id, {
      wins: winnerCar.wins + 1,
      time: time < winnerCar.time ? time : winnerCar.time,
      color,
      carName
    });
  } catch (error) {
    if ((error as Error).message === `${ServerErrorCode.NotFound}`) {
      await RaceApi.createWinner({
        id,
        wins: 1,
        time,
        carName,
        color
      });
    }
  }
}

export async function updateWinner({
  id,
  color,
  carName
}: Pick<Winner, 'id' | 'carName' | 'color'>): Promise<void> {
  try {
    const winnerCar: Winner = await RaceApi.getWinner(id);
    const { time, wins } = winnerCar;
    await RaceApi.updateWinner(id, {
      color,
      carName,
      time,
      wins
    });
  } catch (error) {
    if ((error as Error).message === `${ServerErrorCode.NotFound}`) {
      console.log('Обновить машину в таблице лидеров не удалось. Её там нет.');
    }
  }
}
