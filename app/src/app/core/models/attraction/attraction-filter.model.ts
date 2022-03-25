import { AttractionCategory } from './attraction-category.model';
import { AttractionType } from './attraction-type.model';

export interface AttractionFilter {
  name: {
    key: string;
    value: string;
    enabled: boolean;
  };
  city: {
    key: string;
    value: string[];
    enabled: boolean;
  };
  country: {
    key: string;
    value: string[];
    enabled: boolean;
  };
  reviewRatio: {
    key: string;
    value: number;
    enabled: boolean;
  };
  category: {
    key: string;
    value: AttractionCategory[];
    enabled: boolean;
  };
  attractionType: {
    key: string;
    value: AttractionType[];
    enabled: boolean;
  };
  isPaid: {
    key: string;
    value: boolean;
    enabled: boolean;
  };
}
