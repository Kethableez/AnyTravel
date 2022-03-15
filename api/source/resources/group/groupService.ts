import mongoose from 'mongoose';
import { generateInvitationCode } from '../../functions/generators';
import BaseResponse from '../../utils/baseResponseModel';
import groupSchema from './groupSchema';
import CreateGroupPayload from './payload/createPayload';
import EditGroupPayload from './payload/editGroupPayload';

const ObjectId = mongoose.Types.ObjectId;

class GroupService {
  private groupSchema = groupSchema;

  public async createGroup(founderId: string, payload: CreateGroupPayload): Promise<BaseResponse | Error> {
    try {
      await this.groupSchema.create({
        ...payload,
        founder: new ObjectId(founderId),
        invitationCode: generateInvitationCode(),
        members: [],
        journeys: []
      });

      return { message: 'Created' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async editGroup(founderId: string, groupId: string, payload: EditGroupPayload): Promise<BaseResponse | Error> {
    try {
      const groupToEdit = await this.groupSchema.findById(groupId);

      if (!groupToEdit) throw new Error('Invalid group');
      if (groupToEdit.founder.toString() !== founderId.toString()) throw new Error('Insufficient priviliges');

      await this.groupSchema.findByIdAndUpdate(groupId, payload);

      return { message: 'Updated' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async removeGroup(founderId: string, groupId: string): Promise<BaseResponse | Error> {
    try {
      const groupToRemove = await this.groupSchema.findById(groupId);

      if (!groupToRemove) throw new Error('Invalid group');
      if (groupToRemove.founder.toString() !== founderId.toString()) throw new Error('Insufficient priviliges');

      await this.groupSchema.findByIdAndDelete(groupId);

      return { message: 'Remmoved' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default GroupService;
