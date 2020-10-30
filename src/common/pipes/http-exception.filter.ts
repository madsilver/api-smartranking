import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { response } from "express";
import { request } from "http";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception;

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            message = exception.getResponse();
        }

        this.logger.error(`http status: ${status}, error message: ${JSON.stringify(message)}`);

        ctx.getResponse().status(status).json({
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
            error: message
        });
    }
}