import attractionSchema from '../attraction/attractionSchema';
import groupSchema from '../group/groupSchema';
import journeySchema from '../journey/journeySchema';
import User from '../user/userModel';
import userSchema from '../user/userSchema';
import { faker } from '@faker-js/faker';
import bcryptjs from 'bcryptjs';
import BaseResponse from '../../utils/models/baseResponseModel';
import { generateInvitationCode } from '../../functions/generators';
import Group from '../group/groupModel';

class GeneratorService {
  private userSchema = userSchema;
  private groupSchema = groupSchema;
  private attractionSchema = attractionSchema;
  private journeySchema = journeySchema;

  public async generateUsers(count: number): Promise<BaseResponse | Error> {
    try {
      new Array(count).fill(0).forEach(async () => {
        return await this.generateUser();
      });

      return { message: 'Users generated successfully' };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async generateGroups(count: number): Promise<BaseResponse | Error> {
    try {
      new Array(count).fill(0).forEach(async () => {
        return await this.generateGroup();
      });

      return { message: 'Groups generated successfully' };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  private async generateUser(): Promise<User> {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      role: 'User',
      birthdate: faker.date.past(),
      isActive: true,
      isSubscribed: faker.datatype.boolean()
    };

    return await this.userSchema.create({
      ...data,
      username: faker.internet.userName(data.firstName, data.lastName),
      email: faker.internet.email(data.firstName, data.lastName),
      avatar: 'avatar/default.png',
      password: bcryptjs.hashSync(data.firstName, 10)
    });
  }

  private async generateGroup(): Promise<Group> {
    const data = {
      name: faker.company.companyName(),
      cover: 'group/default.png',
      founder: ((await this.userSchema.findOne({})) as User)._id,
      invitationCode: generateInvitationCode()
    };

    return await this.groupSchema.create({
      ...data,
      members: [],
      journeys: []
    });
  }
}

export default GeneratorService;
