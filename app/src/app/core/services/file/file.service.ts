import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleName } from '@models/module-name.model';
import { BaseResponse } from '@models/base-response.model';
import { BaseRequestService } from '../base-request.service';
import { ParametersInjectorService } from '../parameters-injector.service';

enum FileActions {
  UPLOAD_FILE = 'upload/:selector',
  DELETE_FILE = 'delete/:selector/:filename'
}

export interface UploadResponse {
  message: string;
  filename: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseRequestService {
  constructor(protected override http: HttpClient, protected override injector: ParametersInjectorService) {
    super(http, injector);
  }

  protected get moduleName(): ModuleName {
    return ModuleName.FILE;
  }

  doUploadFile(selector: string, file: FormData): Observable<UploadResponse> {
    const url = this.getUrl(FileActions.UPLOAD_FILE, { selector: selector });

    return this.post<UploadResponse>(url, file);
  }

  doDeleteFile(selector: string, filename: string) {
    const url = this.getUrl(FileActions.UPLOAD_FILE, { selector: selector, filename: filename });

    return this.post<BaseResponse>(url);
  }
}
