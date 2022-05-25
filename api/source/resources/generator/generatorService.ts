import attractionSchema from '../attraction/attractionSchema';
import groupSchema from '../group/groupSchema';
import journeySchema from '../journey/journeySchema';
import User from '../user/userModel';
import userSchema from '../user/userSchema';
import { faker } from '@faker-js/faker';
import BaseResponse from '../../utils/models/baseResponseModel';
import { generateInvitationCode } from '../../functions/generators';
import Group from '../group/groupModel';
import Address from '../../utils/models/addressModel';

class GeneratorService {
  private userSchema = userSchema;
  private groupSchema = groupSchema;
  private attractionSchema = attractionSchema;
  private journeySchema = journeySchema;

  public async generate(selector: string, count: number): Promise<BaseResponse | Error> {
    try {
      switch (selector) {
        case 'user':
          return await this.generateUsers(count);
        case 'group':
          return await this.generateGroups(count);
        case 'attraction':
          return await this.generateAttractions(count);
        case 'journey':
          return await this.generateJourneys(count);
        default:
          throw new Error('Invalid selector');
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

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

  public async generateAttractions(count: number): Promise<BaseResponse | Error> {
    try {
      new Array(count).fill(0).forEach(async () => {
        return await this.generateAttraction();
      });

      return { message: 'Attractions generated successfully' };
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async generateJourneys(count: number): Promise<BaseResponse | Error> {
    try {
      new Array(count).fill(0).forEach(async () => {
        return await this.generateJourney();
      });

      return { message: 'Journeys generated successfully' };
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

    const username = faker.internet.userName(data.firstName, data.lastName);

    return await this.userSchema.create({
      ...data,
      username: username,
      email: faker.internet.email(data.firstName, data.lastName),
      avatar: faker.image.avatar(),
      password: username
    });
  }

  private async generateGroup(): Promise<Group> {
    const uids = (await this.userSchema.find()).map((u) => u.id);

    const data = {
      name: faker.company.companyName(),
      cover: faker.image.people(),
      founder: faker.helpers.arrayElement(uids),
      invitationCode: generateInvitationCode()
    };

    return await this.groupSchema.create({
      ...data,
      members: faker.helpers.arrayElements(
        uids.filter((id) => id.toString() !== data.founder.toString()),
        4
      ),
      journeys: []
    });
  }

  private async generateAttraction(): Promise<any> {
    const data = {
      name: `${faker.word.adjective()} ${faker.word.verb()}`,
      description: faker.commerce.productDescription(),
      cover: faker.image.city(),
      address: this.getFakeAddress(),
      category: faker.helpers.arrayElement(this.category),
      attractionType: faker.helpers.arrayElement(this.type),
      isPaid: faker.datatype.boolean(),
      link: faker.internet.domainName(),
      hours: '06:00 - 18:00'
    };

    return await this.attractionSchema.create({
      ...data,
      ticketPrice: data.isPaid ? faker.helpers.arrayElement(['$', '$$', '$$$', '$$$$']) : null,
      reviews: [],
      reviewRatio: 0,
      isApproved: true
    });
  }

  private async generateJourney(): Promise<any> {
    const groupIds = (await this.groupSchema.find()).map((g) => g._id);
    const attractionIds = (await this.attractionSchema.find()).map((a) => a._id);

    const startDate = faker.date.soon();
    const endDate = faker.date.soon(10, startDate);

    const dates = {
      startDate,
      endDate
    };

    const data = {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      startDate: dates.startDate,
      endDate: dates.endDate,
      cover: faker.image.city(),
      groupId: faker.helpers.arrayElement(groupIds).toString(),
      destination: {
        country: faker.address.country(),
        zipCode: faker.address.zipCode(),
        city: faker.address.city()
      },
      meetingPlace: {
        place: faker.address.streetAddress(),
        date: dates.startDate,
        address: this.getFakeAddress()
      },
      breaks: [],
      attractions: faker.helpers.arrayElements(attractionIds, 10).map((id) => {
        return {
          id: id,
          date: faker.date.between(dates.startDate, dates.endDate),
          duration: faker.helpers.regexpStyleStringParse('[0-12]h[0-60]'),
          additionalInfo: faker.lorem.paragraph()
        };
      }),
      accomodation: faker.helpers.maybe(
        () => {
          return {
            placeName: faker.company.companyName(),
            checkIn: dates.startDate,
            checkOut: dates.endDate,
            address: this.getFakeAddress(),
            additionalInfo: faker.lorem.paragraph(),
            link: faker.internet.domainName()
          };
        },
        { probability: 0.5 }
      )
    };

    return await this.journeySchema.create({
      ...data
    });
  }

  private getFakeAddress(): Address {
    return {
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
      city: faker.address.city(),
      street: faker.address.streetName(),
      apartment: faker.address.buildingNumber(),
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    };
  }

  category = [
    'RESTAURANT',
    'BAR',
    'COFFEE',
    'PARK',
    'GYM',
    'ZOO',
    'ART',
    'MUSEUM',
    'LIBRARY',
    'LAKE',
    'FOREST',
    'BEACH',
    'PARKING',
    'CINEMA',
    'THEATER',
    'STADIUM',
    'CHURCH',
    'OCEAN',
    'SEA',
    'MOUNTAIN'
  ];

  type = ['INDOOR', 'OUTDOOR'];
}

export default GeneratorService;
