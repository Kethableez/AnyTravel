import mongoose from 'mongoose';
import BaseResponse from '../../utils/models/baseResponseModel';
import groupSchema from '../group/groupSchema';
import JourneyModel from './journeyModel';
import journeySchema from './journeySchema';
import CreateJourneyPayload from './payload/createJourney';
import { byUserId } from './../group/groupQuery';
import journeyNotificationSchema from './journeyNotificationSchema';
import JourneyNotification from './journeyNotification.model';

class JourneyService {
  private journeySchema = journeySchema;
  private journeyNotificationSchema = journeyNotificationSchema;
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
        participants: payload.group.participants.map((p) => {
          return { memberId: p, isParticipating: false };
        }),
        cover: 'journey/default.png',
        groupId: new mongoose.Types.ObjectId(payload.group.id)
      });

      const group = await this.groupSchema.findById(payload.group.id);

      if (!group) throw new Error('Invalid group ID');
      group.journeys.push(new mongoose.Types.ObjectId(journey._id));

      const notification = new this.journeyNotificationSchema({
        journeyId: journey._id,
        recievers: group.members.map((id) => {
          return { recieverId: id, isRead: false };
        })
      });

      await journey.save();
      await group.save();
      await notification.save();

      return { message: 'Created' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async updateParticipation(journeyId: string, memberId: string, value: boolean): Promise<BaseResponse | Error> {
    try {
      const journey = await this.journeySchema.findById(journeyId);
      if (!journey) throw new Error('Invalid journey ID');
      const index = journey.participants.findIndex((p) => p.memberId === memberId);
      if (index === -1) throw new Error('You do not belongs to this journey');
      journey.participants[index].isParticipating = value;

      await this.journeySchema.findByIdAndUpdate(journeyId, { participants: journey.participants });
      return { message: 'Participation updated' };
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

  public async getJourneyNotifications(userId: string): Promise<any[] | Error> {
    try {
      const query = {
        'recievers.recieverId': userId
      };

      const journeyNotifications = await this.journeyNotificationSchema.find(query);
      const notifications = journeyNotifications.map((jnf) => {
        return {
          _id: jnf._id,
          journeyId: jnf.journeyId,
          isRead: jnf.recievers.find((r) => r.recieverId.toString() === userId.toString()).isRead
        };
      });

      return notifications;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async markAsRead(notificationId: string, userId: string): Promise<BaseResponse | Error> {
    try {
      const journeyNotification = await this.journeyNotificationSchema.findById(notificationId);
      if (!journeyNotification) throw new Error('Invalid notification ID');
      const index = journeyNotification.recievers.findIndex((r) => r.recieverId.toString() === userId.toString());
      if (index === -1) throw new Error('You do not belongs to this journey');
      journeyNotification.recievers[index].isRead = true;

      await this.journeyNotificationSchema.findByIdAndUpdate(notificationId, {
        recievers: journeyNotification.recievers
      });
      return { message: 'Marked as read' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default JourneyService;
