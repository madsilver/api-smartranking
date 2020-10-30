import { IsOptional } from 'class-validator';
import { DesafioStatus } from '../interfaces/desafio.interface';

export class AtualizarDesafioDto {

  @IsOptional()
  //@IsDate()
  dataHoraDesafio: Date;

  @IsOptional()
  status: DesafioStatus;
}
