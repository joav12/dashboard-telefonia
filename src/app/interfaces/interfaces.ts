export interface Cliente{
    id: number,
    nome: string,
    cpf: string,
    telefone: string,
    email: string,
    dataCriacao: string,
    planoId: number
}

export interface Plano{
    id: number,
    nome: string,
    preco: string,
    franquiaDados: string,
    MinutosLigacao: string
}