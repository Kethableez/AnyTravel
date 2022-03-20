import { includes } from 'lodash';
import { attractionPrefix } from '../../utils/filePrefix';
import BaseResponse from '../../utils/models/baseResponseModel';
import Attraction from './attractionModel';
import attractionSchema from './attractionSchema';
import AttractionPayload from './payload/createPayload';

class AttractionService {
  private attractionSchema = attractionSchema;

  public async createAttraction(payload: AttractionPayload): Promise<BaseResponse | Error> {
    try {
      await this.attractionSchema.create({
        ...payload,
        cover: [attractionPrefix(), payload.cover].join('/'),
        reviews: [],
        isApproved: false
      });
      return { message: 'Created' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async approveAttraction(attractionId: string): Promise<BaseResponse | Error> {
    try {
      await this.attractionSchema.findByIdAndUpdate(attractionId, { isApproved: true });
      return { message: 'Approved' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async deleteAttraction(attractionId: string): Promise<BaseResponse | Error> {
    try {
      await this.attractionSchema.findByIdAndDelete(attractionId);
      return { message: 'attraction deleted' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async addReview(
    userId: string,
    attractionId: string,
    payload: { review: number }
  ): Promise<BaseResponse | Error> {
    try {
      const attraction = await this.attractionSchema.findById(attractionId);
      if (!attraction) throw new Error('Attractio do not exists');
      if (
        includes(
          attraction.reviews.map((r) => r.userId.toString()),
          userId.toString()
        )
      )
        throw new Error('You added an review already');

      const review = {
        userId: userId,
        review: payload.review
      };

      console.log(review);

      attraction.reviews.push(review);

      await this.attractionSchema.findByIdAndUpdate(attractionId, { reviews: attraction.reviews });

      return { message: 'Added review' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getAll(): Promise<Attraction[] | Error> {
    try {
      const attractions = await this.attractionSchema.find({ isApproved: true });

      return attractions;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getToApprove(): Promise<Attraction[] | Error> {
    try {
      const attractions = await this.attractionSchema.find({ isApproved: false });

      return attractions;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getAttraction(attractionId: string): Promise<Attraction | Error> {
    try {
      const attraction = await this.attractionSchema.findById(attractionId);
      if (!attraction) throw new Error('Attraction with given ID do not exists');

      return attraction;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default AttractionService;
