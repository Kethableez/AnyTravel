import BaseResponse from '../../utils/models/baseResponseModel';
import JourneyProcess from './journeyProcessModel';
import journeyProcessSchema from './journeyProcessSchema';
import journeySchema from './journeySchema';

class JourneyService {
  private journeySchema = journeySchema;
  private journeyProcessSchema = journeyProcessSchema;

  public async createProcess(senderId: string, journeyObject: any, step: string): Promise<BaseResponse | Error> {
    try {
      await this.journeyProcessSchema.create({
        senderId,
        journeyObject,
        step
      });
      return {
        message: 'Journey process created'
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async updateProcess(processId: string, journeyObject: any, step: string): Promise<BaseResponse | Error> {
    try {
      await this.journeyProcessSchema.findByIdAndUpdate(processId, {
        journeyObject,
        step
      });
      return {
        message: 'Journey process updated'
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async deleteProcess(processId: string): Promise<BaseResponse | Error> {
    try {
      await this.journeyProcessSchema.findByIdAndDelete(processId);
      return {
        message: 'Journey process deleted'
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getProcess(processId: string): Promise<JourneyProcess | Error> {
    try {
      const process = await this.journeyProcessSchema.findById(processId);
      if (!process) throw new Error('Invalid process Id');
      return process;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }
}

export default JourneyService;
