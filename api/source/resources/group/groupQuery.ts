import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
export const baseQuery = [
  {
    $lookup: {
      from: 'users',
      localField: 'founder',
      foreignField: '_id',
      as: 'founderMap'
    }
  },
  {
    $set: {
      map: {
        $first: '$founderMap'
      }
    }
  },
  {
    $set: {
      'founder._id': '$map._id',
      'founder.username': '$map.username',
      'founder.firstName': '$map.firstName',
      'founder.lastName': '$map.lastName',
      'founder.avatar': '$map.avatar'
    }
  },
  {
    $unset: ['map', 'founderMap']
  },
  {
    $lookup: {
      from: 'users',
      localField: 'members',
      foreignField: '_id',
      as: 'members'
    }
  },
  {
    $lookup: {
      from: 'journeys',
      localField: 'journeys',
      foreignField: '_id',
      as: 'journeys'
    }
  },
  {
    $project: {
      _id: 1,
      name: 1,
      cover: 1,
      founder: 1,
      invitationCode: 1,
      'members._id': 1,
      'members.username': 1,
      'members.firstName': 1,
      'members.lastName': 1,
      'members.avatar': 1,
      'journeys._id': 1,
      'journeys.name': 1,
      'journeys.description': 1,
      'journeys.cover': 1,
      'journeys.startDate': 1,
      'journeys.endDate': 1
    }
  }
];

export const byUserId = (userId: string) => {
  return {
    $match: {
      $or: [
        {
          founder: userId
        },
        {
          members: userId
        }
      ]
    }
  };
};

export const byGroupId = (groupId: string) => {
  return {
    $match: {
      _id: new ObjectId(groupId)
    }
  };
};
