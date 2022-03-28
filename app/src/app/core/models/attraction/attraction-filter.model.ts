import { Address, Attraction } from './attration.model';

export interface FilterInput {
  key: string;
  label: string;
  value: any;
  displayValues?: any[];
  enabled: boolean;
}

enum SortOptions {
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  RATING_ASC = 'RAITING_ASC',
  RATING_DESC = 'RAITING_DESC'
}

export interface AttractionFilter {
  search: FilterInput;
  sort: FilterInput;
  city: FilterInput;
  country: FilterInput;
  category: FilterInput;
  attractionType: FilterInput;
  isPaid: FilterInput;
  reviewRatio: FilterInput;
}

export function initFilters(list: Attraction[]): AttractionFilter {
  return {
    search: {
      key: 'search',
      label: 'Szukanie',
      value: '',
      enabled: false
    },
    sort: {
      key: 'sort',
      label: 'Sortowanie',
      value: SortOptions.NAME_ASC,
      displayValues: [SortOptions.NAME_ASC, SortOptions.NAME_DESC, SortOptions.RATING_ASC, SortOptions.RATING_DESC],
      enabled: true
    },
    city: {
      key: 'city',
      label: 'Miasto',
      value: [],
      displayValues: getDisplayValue(list, 'city'),
      enabled: false
    },
    country: {
      key: 'country',
      label: 'Państwo',
      value: [],
      displayValues: getDisplayValue(list, 'country'),
      enabled: false
    },
    reviewRatio: {
      key: 'reviewRatio',
      label: 'Ocena',
      value: 0,
      displayValues: ['1', '0.75', '0.5', '0.25', '0'],
      enabled: false
    },
    category: {
      key: 'category',
      label: 'Kategoria',
      value: [],
      displayValues: getDisplayValue(list, 'category'),
      enabled: false
    },
    attractionType: {
      key: 'attractionType',
      label: 'Typ',
      value: [],
      displayValues: getDisplayValue(list, 'attractionType'),
      enabled: false
    },
    isPaid: {
      key: 'isPaid',
      label: 'Cena',
      value: false,
      displayValues: [true, false],
      enabled: false
    }
  };
}

function getDisplayValue(list: Attraction[], key: string) {
  const array = list.map((r) => {
    return r[key as keyof Attraction] !== undefined ? r[key as keyof Attraction] : r.address[key as keyof Address];
  });

  return removeDuplicates(array as any);
}

function removeDuplicates(values: any[]) {
  return [...new Set(values)];
}
