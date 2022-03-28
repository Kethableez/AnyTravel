/* eslint-disable @typescript-eslint/no-explicit-any */
import { includes } from 'lodash';
import mongoose from 'mongoose';
import { generateInvitationCode } from '../../functions/generators';
import BaseResponse from '../../utils/models/baseResponseModel';
import { groupPrefix } from '../../utils/filePrefix';
import userSchema from '../user/userSchema';
import Group from './groupModel';
import { baseQuery, byGroupId, byUserId } from './groupQuery';
import groupSchema from './groupSchema';
import CreateGroupPayload from './payload/createPayload';
import EditGroupPayload from './payload/editGroupPayload';
import JoinPayload from './payload/joinPayload';
import LeavePayload from './payload/leavePayload';

const ObjectId = mongoose.Types.ObjectId;

class GroupService {
  private groupSchema = groupSchema;
  private userSchema = userSchema;

  public async getAllGroups(): Promise<Group[] | Error> {
    try {
      const groups = await this.groupSchema.aggregate(baseQuery);
      return groups;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getGroup(groupId: string): Promise<any[] | Error> {
    try {
      const group = await this.groupSchema.aggregate([byGroupId(groupId), ...baseQuery]);
      if (!group) throw new Error('Group with given ID do not exists');
      return group;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getUserGroups(userId: string): Promise<any[] | Error> {
    try {
      const group = await this.groupSchema.aggregate([byUserId(userId), ...baseQuery]);
      if (!group) throw new Error('Group with given ID do not exists');

      return group;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async createGroup(founderId: string, payload: CreateGroupPayload): Promise<BaseResponse | Error> {
    try {
      await this.groupSchema.create({
        ...payload,
        cover: [groupPrefix(), payload.cover].join('/'),
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
      if (payload.cover) {
        payload.cover = [groupPrefix(), payload.cover].join('/');
      }

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

  public async addToGroup(founderId: string, groupId: string, memberEmail: string): Promise<BaseResponse | Error> {
    try {
      const group = await this.groupSchema.findById(groupId);
      const userToAdd = await this.userSchema.findOne({ email: memberEmail });

      if (!group) throw new Error('Invalid group');
      if (!userToAdd) throw new Error('No username with given email');
      if (group.founder.toString() !== founderId.toString()) throw new Error('Insufficient priviliges');
      if (userToAdd._id.toString() === founderId.toString()) throw new Error('Cannot add self to the group members');
      if (
        includes(
          group.members.map((m) => m.toString()),
          userToAdd._id.toString()
        )
      ) {
        throw new Error('This user already a member');
      }

      group.members.push(new ObjectId(userToAdd._id));
      await group.save();
      return { message: 'User added' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async removeFromGroup(founderId: string, groupId: string, memberId: string): Promise<BaseResponse | Error> {
    try {
      const group = await this.groupSchema.findById(groupId);

      if (!group) throw new Error('Invalid group');
      if (group.founder.toString() !== founderId.toString()) throw new Error('Insufficient priviliges');
      if (
        !includes(
          group.members.map((m) => m.toString()),
          memberId
        )
      ) {
        throw new Error('This user not exists in the group');
      }

      group.members = group.members.filter((m) => m.toString() !== memberId);
      await group.save();
      return { message: 'User removed' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async joinToGroup(payload: JoinPayload): Promise<BaseResponse | Error> {
    try {
      const { memberId, groupId, invitationCode } = payload;

      const group = await this.groupSchema.findById(groupId);
      const userToAdd = await this.userSchema.findById(memberId);
      if (!group) throw new Error('Invalid group');
      if (!userToAdd) throw new Error('No username with given email');
      if (userToAdd._id.toString() === group.founder.toString())
        throw new Error('Cannot add self to the group members');
      if (
        includes(
          group.members.map((m) => m.toString()),
          userToAdd._id.toString()
        )
      ) {
        throw new Error('This user already a member');
      }
      if (group.invitationCode !== invitationCode) throw new Error('Invalid invitation code');

      group.members.push(new ObjectId(userToAdd._id));
      await group.save();
      return { message: 'User added' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async leaveGroup(payload: LeavePayload): Promise<BaseResponse | Error> {
    try {
      const { groupId, memberId } = payload;

      const group = await this.groupSchema.findById(groupId);

      if (!group) throw new Error('Invalid group');
      if (memberId === group.founder.toString()) throw new Error('Cannot leave your own group');
      if (
        !includes(
          group.members.map((m) => m.toString()),
          memberId
        )
      ) {
        throw new Error('This user not exists in the group');
      }
      group.members = group.members.filter((m) => m.toString() !== memberId);
      await group.save();
      return { message: 'User added' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default GroupService;
