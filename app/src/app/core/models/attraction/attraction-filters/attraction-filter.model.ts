import { FilterInput } from './filter-input.model';

export interface AttractionFilter {
  city: FilterInput;
  country: FilterInput;
  category: FilterInput;
  attractionType: FilterInput;
  ticketPrice: FilterInput;
}
