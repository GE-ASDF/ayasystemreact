/**
 * Rebece uma string com acentos, letras maiúsculas e minúsculas e a normaliza usando as funções toLowerCase() 
 * para deixar em caixa baixa e normalize("NFD") para ignorar os acentos.
 * @param {string | number} string - String não normalizada
 * @returns string Retorna a string sem acentos e em caixa baixa
 */

export const normalizeString = (string)=>{
    return String(string).toLowerCase().normalize('NFD')
}