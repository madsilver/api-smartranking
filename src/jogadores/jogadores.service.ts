import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criaJogadorDto:CriarJogadorDto): Promise<void> {
        const { email } = criaJogadorDto;
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        if (jogadorEncontrado) {
            this.atualizar(jogadorEncontrado, criaJogadorDto);
            return;
        }

        this.criar(criaJogadorDto);
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Email ${email} não encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, email, telefoneCelular } = criaJogadorDto;

        const jogador: Jogador = {
            _id: uuid4(),
            nome,
            email,
            telefoneCelular,
            ranking: 'A',
            posicaoRanking: 8,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }

        this.logger.log(`criaJogadorDto: ${JSON.stringify(criaJogadorDto)}`);
        this.jogadores.push(jogador);
    }

    private atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): void {
        const { nome } = criaJogadorDto;
        jogadorEncontrado.nome = nome;
    }
}
