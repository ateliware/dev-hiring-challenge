import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

const logger = new Logger('ExternalApiRequestService');

export type ExternalApiRequestParams = {
  url: string;
  method: 'post' | 'get' | 'delete';
  baseURL: string;
  payload?: any;
  extraConfig?: AxiosRequestConfig;
};

@Injectable()
export class ExternalApiRequestService {
  constructor(private httpService: HttpService) {}

  async makeAxiosRequest<T = any>({
    method,
    url,
    payload,
    extraConfig,
    baseURL,
  }: ExternalApiRequestParams) {
    const endpoint = `${baseURL}${url}`;

    const config = {
      ...extraConfig,
      headers: {
        'Content-Type': 'application/json',
        ...extraConfig?.headers,
      },
    };

    logger.debug(
      `> ${method.toUpperCase()} ${endpoint} config[${JSON.stringify(
        config,
      )}] ${payload ? `payload[${JSON.stringify(payload)}]` : ''}`,
    );

    let res: T | HttpException;

    try {
      res = await lastValueFrom(
        this.httpService[method]<T>(
          endpoint,
          ...[payload, config].filter(
            (httpServiceArgument) => !!httpServiceArgument,
          ),
        ).pipe(map((res) => res.data)),
      );
    } catch (httpServiceError) {
      res = new HttpException(
        {
          message: httpServiceError?.response?.data || 'Something went wrong',
          statusCode:
            httpServiceError?.response?.status ||
            HttpStatus.INTERNAL_SERVER_ERROR,
        },
        httpServiceError?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );

      console.log(JSON.stringify(httpServiceError));
      console.log(httpServiceError.stack);
    } finally {
      if (res instanceof HttpException) throw res;
      return res;
    }
  }
}
