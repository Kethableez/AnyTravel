import { OperatorFunction, filter } from 'rxjs';
import { exists } from './exists';

export function filterExists<T>(): OperatorFunction<T, NonNullable<T>> {
  return filter<T>((item) => exists(item)) as OperatorFunction<T, NonNullable<T>>;
}
