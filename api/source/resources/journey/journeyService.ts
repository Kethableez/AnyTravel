import mongoose from 'mongoose';
import BaseResponse from '../../utils/models/baseResponseModel';
import groupSchema from '../group/groupSchema';
import JourneyModel from './journeyModel';
import journeySchema from './journeySchema';
import CreateJourneyPayload from './payload/createJourney';

class JourneyService {
  private journeySchema = journeySchema;
  private groupSchema = groupSchema;

  public async createJourney(payload: CreateJourneyPayload): Promise<BaseResponse | Error> {
    try {
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

  public async getJourneysByGroups(groupIds: string[]): Promise<JourneyModel[] | Error> {
    try {
      const journeys = await this.journeySchema.find({
        groupId: {
          $in: groupIds.map((id) => new mongoose.Types.ObjectId(id))
        }
      });
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
