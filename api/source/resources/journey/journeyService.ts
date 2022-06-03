import mongoose from 'mongoose';
import BaseResponse from '../../utils/models/baseResponseModel';
import groupSchema from '../group/groupSchema';
import JourneyModel from './journeyModel';
import journeySchema from './journeySchema';
import CreateJourneyPayload from './payload/createJourney';
import { byUserId } from './../group/groupQuery';

class JourneyService {
  private journeySchema = journeySchema;
  private groupSchema = groupSchema;

  query = (groupsId: mongoose.Types.ObjectId[]) => {
    return [
      {
        $match: {
          groupId: {
            $in: groupsId
          }
        }
      },
      {
        $lookup: {
          from: 'attractions',
          localField: 'attractions.id',
          foreignField: '_id',
          as: 'attractionsObj'
        }
      },
      {
        $addFields: {
          attractions: {
            $map: {
              input: {
                $zip: {
                  inputs: ['$attractions', '$attractionsObj']
                }
              },
              in: {
                $mergeObjects: '$$this'
              }
            }
          }
        }
      },
      {
        $unset: ['attractionsObj', 'attractions.id']
      }
    ];
  };

  public async createJourney(payload: CreateJourneyPayload): Promise<BaseResponse | Error> {
    try {
      payload.attractions.forEach((a: any) => delete (a as any).name);
      payload.attractions.forEach((a: any) => (a.id = new mongoose.Types.ObjectId(a.id)));

      const journey = new this.journeySchema({
        ...payload.information,
        ...payload,
        cover: 'journey/default.png',
        groupId: new mongoose.Types.ObjectId(payload.group.id)
      });

      const group = await this.groupSchema.findById(payload.group.id);
      if (!group) throw new Error('Invalid group ID');
      group.journeys.push(new mongoose.Types.ObjectId(journey._id));
      await journey.save();
      await group.save();

      return { message: 'Created' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getJourney(journeyId: string): Promise<JourneyModel | Error> {
    try {
      const journey = await this.journeySchema.findById(journeyId);
      if (!journey) throw new Error('Invalid ID');

      return journey;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getUserJourneys(userId: string): Promise<JourneyModel[] | Error> {
    try {
      const groups = await this.groupSchema.find(byUserId(userId));
      const groupIds = groups.map((group) => group._id);
      const journeys = await this.journeySchema.aggregate(this.query(groupIds));
      return journeys;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getJourneysByGroupId(groupId: string): Promise<JourneyModel[] | Error> {
    try {
      const journeys = await this.journeySchema.find({ groupId: groupId });
      return journeys;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default JourneyService;
