import { BaseModel } from '../core/BaseModel';
import * as ReactRedux from 'react-redux';
import { RequestOptions, UseSelector } from '../core/utils/types';
import { FetchHandle } from './types';
import { BaseRequestAction } from '../core/action/BaseRequestAction';
import { METHOD } from '../core/utils/method';

export abstract class Model<Data = null> extends BaseModel<Data> {
  protected switchReduxSelector<TState = any, TSelected = any>(): UseSelector<TState, TSelected> {
    return ReactRedux.useSelector;
  }

  protected patch<Response = any, Payload = undefined>(options: RequestOptions<Response, Payload>): FetchHandle<Response, Payload> {
    // @ts-ignore
    return BaseRequestAction.createRequestData({
      method: METHOD.patch,
      middleware: this.getMiddlewareName(),
      ...options,
      uri: options.uri.getUri(),
    });
  }
}
