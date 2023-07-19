import { RaceApi } from '@api/api';
import { ServerErrorCode } from '@api/enum';
import { Winner } from '@api/interface';

export async function saveWinner({
  id,
  time
}: Pick<Winner, 'id' | 'time'>): Promise<void> {
  try {
    await RaceApi.getWinner(id);
    const winnerCar: Winner = await RaceApi.getWinner(id);
    await RaceApi.updateWinner(id, {
      wins: winnerCar.wins + 1,
      time: time < winnerCar.time ? time : winnerCar.time
    });
  } catch (error) {
    if ((error as Error).message === `${ServerErrorCode.NotFound}`) {
      await RaceApi.createWinner({
        id,
        wins: 1,
        time
      });
    }
  }
}
