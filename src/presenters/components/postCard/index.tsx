import React, { useState, useRef } from 'react';
import Hero from '../../assets/Hero.png';
import { DotsThreeVertical } from 'phosphor-react';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface CardProps {
  title: string;
  description: string;
  author: string;
  createDate?: string;
  isLandscape?: boolean;
}

const PostCard: React.FC<CardProps> = ({
  title,
  description,
  author,
  createDate,
  isLandscape,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDialogOpen = () => setIsOpen(prev => !prev);

  useClickOutside([dialogRef, buttonRef], () => setIsOpen(false));

  return (
    <div
      className={`flex ${
        isLandscape
          ? 'flex-row-reverse min-w-sm max-w-5xl w-3x1'
          : 'flex-col-reverse max-w-sm w-full'
      }`}
    >
      {/* Imagem */}
      <div
        className={`h-48 ${
          isLandscape ? 'h-auto w-1/3 rounded-r-lg' : 'rounded-b-lg'
        } flex-none bg-cover bg-center text-center overflow-hidden`}
        style={{ backgroundImage: `url(${Hero})` }}
        title={title}
      ></div>

      {/* Conteúdo */}
      <div
        className={`border border-[#DFDFDF] bg-white p-4 flex flex-col justify-between leading-normal
        ${isLandscape ? 'rounded-l-lg' : 'rounded-t-lg'}`}
      >
        <div className="mb-8">
          {isOpen && (
            <div
              ref={dialogRef}
              className={`absolute ${isLandscape ? 'mt-8 ml-140' : 'mt-8 ml-45'} bg-white rounded-[5px] border border-[#DFDFDF] shadow-md`}
            >
              <div className="min-w-[80px]">
                <ul className="divide-y divide-[#DFDFDF] text-center">
                  <li className="cursor-pointer py-1 text-black hover:bg-gray-300 rounded-t-[5px]">
                    Editar
                  </li>
                  <li className="cursor-pointer py-1 text-red-500 hover:bg-gray-300 rounded-b-[5px]">
                    Deletar
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <span className="capitalize text-gray-900 font-bold text-xl mb-2 mr-3 line-clamp-2">
              {title}
            </span>
            <button
              ref={buttonRef}
              onClick={handleDialogOpen}
              className="text-black font-bold "
            >
              {' '}
              <DotsThreeVertical className="w-10 h-10 -mt-10 -mr-3 cursor-pointer " />
            </button>
          </div>

          <p className="capitalize text-gray-700 text-base  line-clamp-5 mt-3">
            {description}
          </p>
        </div>

        <div className="flex justify-between">
          <data className="text-left italic text-gray-400">{createDate}</data>
          <p className="capitalize text-right italic truncate w-48">
            Criado por: {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
