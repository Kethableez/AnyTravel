import { flatten } from 'lodash';
import attractionSchema from '../attraction/attractionSchema';
import journeySchema from '../journey/journeySchema';

class StatService {
  private journeySchema = journeySchema;
  private attractionSchema = attractionSchema;

  public async getAttractionRanking(): Promise<any | Error> {
    try {
      const ids = flatten((await this.journeySchema.find()).map((j) => j.attractions.map((a) => a.id)));
      const ranking = ids.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
      }, {});

      const aIds = Object.keys(ranking)
        .map((key) => ({ id: key, count: ranking[key] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((a) => a.id);

      const attractions = await this.attractionSchema.find({ _id: { $in: aIds } });

      return attractions;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getCityRanking(): Promise<any | Error> {
    try {
      return { message: 'City ranking retrieved successfully', data: 'none' };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default StatService;
