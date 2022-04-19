/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Dictionary } from '@models/dictionary.model';

type Parameters = [string, string][];

@Injectable({
  providedIn: 'root'
})
export class ParametersInjectorService {
  injectParameters(path: string, parameters: Dictionary<any>) {
    const encodedParameters = this.getEncodedParameters(parameters);
    return this.getChangedPath(path, encodedParameters);
  }

  private replaceAll(input: string, toReplace: string, replacement: string): string {
    return input.split(`:${toReplace}`).join(replacement);
  }

  private getEncodedParameters(parameters: Dictionary<any>): Parameters {
    return Object.entries(parameters).map(([key, value]) => [key, encodeURIComponent(value)]);
  }

  private getChangedPath(path: string, parameters: Parameters) {
    return parameters.reduce((previousPath, [key, value]) => this.replaceAll(previousPath, key, value), path);
  }
}
