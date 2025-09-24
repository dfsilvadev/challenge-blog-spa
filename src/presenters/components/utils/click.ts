import { useEffect } from 'react';

/**
 * Hook personalizado para detectar cliques fora de um elemento específico.
 *
 * Este hook adiciona um listener global de mouse e executa a função de callback
 * quando o usuário clica fora do elemento referenciado.
 *
 * @template T Tipo do elemento HTML que será monitorado.
 * @param ref React.RefObject<T> - Referência do elemento DOM que deve ser monitorado.
 * @param onClickOutside Função de callback executada sempre que um clique externo for detectado.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => {
 *   console.log("Clique fora detectado!");
 * });
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onClickOutside]);
}
