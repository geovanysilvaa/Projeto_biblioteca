/**
 * DTOS de Instituição
*/

export interface LoginInstituicaoDTO {
  email: string;
  senha: string;
}

export interface CreateInstituicaoDTO {
  email: string;
  nome: string;
  senha: string;
}

export interface ResponseInstituicaoDTO {
  id: number;
  email: string;
  nome: string;
  createdAt: Date;
}

export interface ResponseSegureRepository {
  id: number;
  nome: string;
  email: string;
  senha: string;
  createdAt: Date;
}

export interface UpdateInstituicaoDTO {
  nome?: string;
  email?: string;
  senha?: string;
}