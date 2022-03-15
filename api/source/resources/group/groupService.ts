import mongoose from 'mongoose';
import { generateInvitationCode } from '../../functions/generators';
import groupSchema from './groupSchema';

const ObjectId = mongoose.Types.ObjectId;

class GroupService {
  private groupSchema = groupSchema;

  public async createGroup(founderId: string, payload: CreatePayload) {
    try {
      const group = await this.groupSchema.create({
        ...payload,
        founderId: new ObjectId(founderId),
        invitationCode: generateInvitationCode(),
        members: [],
        journeys: []
      });

      return { message: 'Created with success', groupId: group._id };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async editGroup(founderId: string, payload: EditePayload) {
    try {
      const groupToEdit = await this.groupSchema.findById(payload.groupId);

      if (!groupToEdit) {
        throw new Error('Group with given ID not found');
      }

      if (groupToEdit.founder !== founderId) {
        throw new Error('You have no rights to perform this acction');
      }

      const toUpdate = {
        name: payload.name ? payload.name : groupToEdit.name,
        coverPhotoRef: payload.coverPhoto ? payload.coverPhoto : groupToEdit.coverPhotoRef
      };

      await this.groupSchema.findByIdAndUpdate(payload.groupId, toUpdate);

      return `Group with ${payload.groupId} was updated with success`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async deleteGroup() {}

  public async joinToGroup() {}

  public async addToGroup() {}

  public async leaveGroup() {}

  public async removeFromGroup() {}
}

export default GroupService;

interface CreatePayload {
  name: string;
  coverPhoto: string;
}

interface EditePayload {
  groupId: string;
  name: string;
  coverPhoto: string;
}
