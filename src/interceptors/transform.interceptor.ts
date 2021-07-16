import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		context.switchToHttp().getResponse().status(HttpStatus.OK);
		return next.handle().pipe(
			map(data => {
				if (data && data['status']) {
					return data;
				}
				return {
					statusCode : 200,
					data : data.data,
					message : data.message? data.message:"SUCCESS"
				};
			})
		);
	}

}
