import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Hook personalizado para detectar cliques/touch fora de um ou mais elementos específicos.
 *
 * Este hook adiciona listeners globais de mouse e toque e executa a função de callback
 * quando o usuário interage fora de todos os elementos referenciados.
 *
 * @param refs Um ou mais React.RefObject<HTMLElement | null> - Referências dos elementos DOM que devem ser monitorados.
 * @param onClickOutside Função de callback executada sempre que uma interação externa for detectada.
 *
 * @example
 * const dialogRef = useRef<HTMLDivElement>(null);
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useClickOutside([dialogRef, buttonRef], () => {
 *   console.log("Clique ou toque fora detectado!");
 * });
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | Array<RefObject<HTMLElement | null>>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleEvent(event: MouseEvent | TouchEvent) {
      const refArray = Array.isArray(refs) ? refs : [refs];

      const isInside = refArray.some(ref =>
        ref.current?.contains(event.target as Node)
      );

      if (!isInside) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
    };
  }, [refs, onClickOutside]);
}
