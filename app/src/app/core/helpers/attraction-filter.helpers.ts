import { includes, uniqBy } from 'lodash';
import { AttractionFilter } from '../models/attraction/attraction-filters/attraction-filter.model';
import { FilterInput } from '../models/attraction/attraction-filters/filter-input.model';
import { InputValue } from '../models/attraction/attraction-filters/input-value.model';
import { SortOptions } from '../models/attraction/attraction-filters/sort-options.model';
import { Attraction, Address } from '../models/attraction/attration.model';

export function initFilters(list: Attraction[]): AttractionFilter {
  return {
    city: {
      key: 'city',
      label: 'Miasto',
      input: getDisplayValue(list, 'city')
    },
    country: {
      key: 'country',
      label: 'Państwo',
      input: getDisplayValue(list, 'country')
    },
    category: {
      key: 'category',
      label: 'Kategoria',
      input: getDisplayValue(list, 'category')
    },
    attractionType: {
      key: 'attractionType',
      label: 'Typ',
      input: getDisplayValue(list, 'attractionType')
    },
    isPaid: {
      key: 'isPaid',
      label: 'Czy płatna',
      input: [
        {
          value: true,
          enabled: false
        },
        {
          value: false,
          enabled: false
        }
      ]
    }
  };
}

function getDisplayValue(list: Attraction[], key: string): InputValue[] {
  const array = list.map((r) => {
    return {
      value: r[key as keyof Attraction] !== undefined ? r[key as keyof Attraction] : r.address[key as keyof Address],
      enabled: false
    } as InputValue;
  });

  return uniqBy(array, 'value');
}

export function isMatch(attraction: Attraction, filters: any[]) {
  const match = filters.map((f) => {
    return checkMulti(attraction, f as FilterInput, f.key);
  });
  return !includes(match, false);
}

function checkMulti(attraction: Attraction, filterInput: FilterInput, key: keyof Attraction) {
  const input = filterInput.input.filter((i) => i.enabled).map((i) => i.value);
  const value = attraction[key] !== undefined ? attraction[key] : attraction.address[key as keyof Address];

  return input.length !== 0 ? includes(input, value) : true;
}

export function sortSelector(sort: SortOptions, a: Attraction, b: Attraction) {
  switch (sort) {
    case SortOptions.NAME_ASC:
      return a.name > b.name ? 1 : -1;

    case SortOptions.NAME_DESC:
      return a.name < b.name ? 1 : -1;

    case SortOptions.RATING_ASC:
      return a.name > b.name ? 1 : -1;

    case SortOptions.RATING_DESC:
      return a.name < b.name ? 1 : -1;
  }
}
