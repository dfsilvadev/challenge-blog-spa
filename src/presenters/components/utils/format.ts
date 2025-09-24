// src/utils/format.ts

/**
 * Formata uma string:
 * - Primeira letra maiúscula
 * - Limita a um número máximo de caracteres
 * @param input string de entrada
 * @param maxLength tamanho máximo (padrão 20)
 * @returns string formatada
 */
export function FormatUpperAndCharacterLimiter(
  input: string,
  maxLength?: number
): string {
  if (!input) return '';

  let result = input;

  if (maxLength !== undefined && maxLength > 0) {
    if (input.length > maxLength) {
      result = input.slice(0, maxLength) + '...';
    } else {
      result = input;
    }
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
}
