import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:@dmin123@cluster0.vfycc.mongodb.net/smartrnking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
