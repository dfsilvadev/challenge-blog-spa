import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DotsThreeVertical } from 'phosphor-react';
import { Routes } from '../../router/constants/routesMap';
import { useAuth } from '../../../hooks/useAuth';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface CardProps {
  postId: string;
  title: string;
  description: string;
  author: string;
  createDate: string;
  category: string;
  isLandscape?: boolean;
  onDelete: () => void;
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
    if (!isLandscape) return '40%';
    if (cardWidth <= 0) return '40%';

    const minPercent = 0.1;
    const maxPercent = 0.3;
    const percent =
      maxPercent - (cardWidth / window.innerWidth) * (maxPercent - minPercent);
    return `${Math.max(minPercent, Math.min(maxPercent, percent)) * 100}%`;
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
    <div ref={cardRef} className="relative mx-auto mt-5">
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
        flex flex-col justify-between relative
        ${
          isLandscape
            ? 'w-[80vw] h-[200px] mx-auto'
            : 'w-[42vw] md:w-[22vw] xl:w-[15vw] h-[200px] xl:h-[300px]'
        }`}
      >
        {/* Ícone de menu no canto superior direito */}
        {isLoggedIn && (
          <button
            onClick={e => {
              e.stopPropagation();
              setIsDialogOpen(prev => !prev);
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 z-50"
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
                onDelete();
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
          <div className="font-bold text-2xl text-black mb-2 capitalize">
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

export default PostCard;
