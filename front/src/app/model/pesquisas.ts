export interface Pesquisa {
    id: number;
    titulo: string;
    subtitulo?: string | null;
    autor: string;
    editora: string;
    isbn: string;
    descricao?: string | null;
    idioma: string;
    ano: number;
    paginas: number;
    preco: number;
    estoque: number;
    desconto: number;
    disponivel: string;
    dimensoes?: number | null;
    peso?: number | null

}