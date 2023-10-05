import config from "../../config/config";


/**
 * Remove o nono dígito de um número de telefone se o tamanho dele for igual a variável sizeNumber
 * @param {string} number - O número de telefone com o nono dígito
 * @returns {string} - O número de telefone sem o nono dígito
 */


export function removeNineDigit(number, sizeNumber){
    const lengthCodeCountry = config.countryCodeAndDDD.length;
    if(number.length >= sizeNumber){
        return `${number.slice(0, config.countryCodeAndDDD.length)}${number.slice(config.countryCodeAndDDD.length + 1)}`
    }
    return number;
}

/**
 * Impõe ao número de telefone o código do país do arquivo .env
 * @param {string} number - O número de telefone sem o código do país
 * @returns {string} - O número de telefone com o código do país
 */
export function setCodeCountry(number){
    return `${config.countryCode}${number}`;
}

/**
 * Verifica usando-se de regex se o número informado inicia com o código do pais no arquivo .env
 * @param {string} number - O número de telefone a ser verificado
 * @returns {string} - O número de telefone verificado
 */
function verifyCodeCountry(number){
    const regexCodeCountry = new RegExp(`^${config.countryCode}`);
    if(regexCodeCountry.test(number)){
        return number;
    }else{
        return setCodeCountry(number);
    }
}

/**
 * Remove caracteres não numéricos de um número de telefone
 * @param {string} number - O número de telefone com caracteres não numéricos
 * @returns {string} - O número de telefone formatado e limpo.
 */
export const getOnlyNumbers = (number)=>{
    const clear = number.replace(/[^0-9]/g,'')
    const numberWithCodeCountry =  verifyCodeCountry(clear);    
    return removeNineDigit(numberWithCodeCountry, 13)
}

