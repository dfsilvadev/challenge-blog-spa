import { DotsThreeVertical } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { Routes } from '../../router/constants/routesMap';

interface CardProps {
  postId: string;
  title: string;
  description: string;
  author: string;
  createDate: string;
  category: string;
  isLandscape?: boolean;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<CardProps> = ({
  postId,
  title,
  description,
  author,
  createDate,
  category,
  isLandscape,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const formatted = new Date(createDate).toLocaleDateString('pt-BR');
  const cardRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();
  const [cardWidth, setCardWidth] = useState(0);

  useClickOutside(cardRef, () => setIsDialogOpen(false));

  useEffect(() => {
    if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);

    const handleResize = () => {
      if (cardRef.current) setCardWidth(cardRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBackgroundWidth = () => {
    if (!isLandscape) return '120px'; // Largura fixa em pixels para evitar estiramento
    if (cardWidth <= 0) return '80px';

    // Largura fixa baseada no tamanho do card, mas limitada
    const maxWidth = Math.min(cardWidth * 0.4, 200); // Máximo 200px
    const minWidth = 60; // Mínimo 60px
    return `${Math.max(minWidth, Math.min(maxWidth, 150))}px`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button[aria-label="Abrir menu de opções"]') ||
      target.closest('.menu-options')
    ) {
      return;
    }

    navigate(Routes.POST_DETAILS.replace(':id', postId));
  };

  return (
    <div
      ref={cardRef}
      className={`relative mt-5 ${isLandscape ? 'w-full' : 'mx-auto'}`}
    >
      {/* Div de fundo menor (decorativa e responsiva) */}
      <div
        className={`absolute top-0 -mt-5 h-40 rounded-lg ${category || 'bg-blue-500'}`}
        style={{
          width: getBackgroundWidth(),
          right: '10%',
          transform: 'translateY(0)',
        }}
      ></div>

      {/* Card principal */}
      <button
        onClick={handleCardClick}
        className={`bg-white rounded-lg border border-[#DFDFDF] overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]
        flex flex-col justify-between relative w-full
        ${isLandscape ? 'h-[200px]' : 'h-[280px]'}`}
        style={{
          height: isLandscape ? '200px' : '280px',
          minHeight: isLandscape ? '200px' : '280px',
          maxHeight: isLandscape ? '200px' : '280px',
          flexShrink: 0,
        }}
      >
        {/* Ícone de menu no canto superior direito */}
        {isLoggedIn && (
          <button
            onClick={e => {
              e.stopPropagation();
              setIsDialogOpen(prev => !prev);
            }}
            className="cursor-pointer absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 z-50 bg-white/70 backdrop-blur-sm"
            aria-label="Abrir menu de opções"
          >
            <DotsThreeVertical size={24} className="text-black" weight="bold" />
          </button>
        )}

        {/* Dialog com opções */}
        {isDialogOpen && (
          <div
            className="menu-options absolute rounded-[5px] border border-[#DFDFDF] divide-y divide-[#DFDFDF] top-[10px] bg-white shadow-md w-32 z-50 flex flex-col"
            style={{ right: 'calc(30px + 5px)' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => {
                navigate(Routes.DASHBOARD_EDIT_POST.replace(':id', postId));
                setIsDialogOpen(false);
              }}
              className="px-4 py-2 text-center text-black hover:bg-gray-100"
            >
              Editar
            </button>
            <button
              onClick={() => {
                onDelete(postId);
                setIsDialogOpen(false);
              }}
              className="px-4 py-2 text-center hover:bg-gray-100 text-red-600"
            >
              Deletar
            </button>
          </div>
        )}

        {/* Conteúdo do card */}
        <div className="px-6 py-4 flex-1 flex flex-col">
          <div className="text-left font-bold text-2xl text-black mb-2 capitalize pr-10 line-clamp-2">
            {title}
          </div>
          <p className="text-gray-700 pt-3 text-base capitalize line-clamp-8 text-justify">
            {description}
          </p>
        </div>

        {/* Rodapé */}
        <div className="flex justify-between px-6 py-2 border-t border-[#DFDFDF]">
          <data className="text-left italic text-gray-400">{formatted}</data>
          <p className="capitalize text-right italic truncate w-40">
            Aut.: {author}
          </p>
        </div>
      </button>
    </div>
  );
};

export default React.memo(PostCard);
