export interface CreateAluno {      
  nome:string;          
  turma:string;        
  instituicaoID:number;
}

export interface ResponseAluno {
  id:number;           
  turma:string;        
  nome:string;          
  instituicaoID:number;
}

export interface UpdateAluno {     
  turma?:string;        
  nome?:string;      
  instituicaoID?:number;    
}