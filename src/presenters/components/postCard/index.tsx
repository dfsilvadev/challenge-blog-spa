import React, { useState, useRef, useEffect } from 'react';
import Hero from '../../assets/Hero.png';
import { DotsThreeVertical } from 'phosphor-react';
import { useClickOutside } from '../../../hooks/useClickOutside';

import { useNavigate } from 'react-router';
import { Routes } from '../../router/constants/routesMap';

interface CardProps {
  postId: string;
  title: string;
  description: string;
  author: string;
  createDate: string;
  isLandscape?: boolean;
  onDelete: () => void;
}

const PostCard: React.FC<CardProps> = ({
  postId,
  title,
  description,
  author,
  createDate,
  isLandscape,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formatted = new Date(createDate).toLocaleDateString('pt-BR');
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem('token')
  );

  const handleDialogOpen = () => setIsOpen(prev => !prev);

  useClickOutside([dialogRef, buttonRef], () => setIsOpen(false));

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'token') setIsLoggedIn(!!e.newValue);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex ${
        isLandscape ? 'flex-row w-3x1 min-w-sm' : 'flex-col max-w-sm w-full '
      }`}
    >
      <div
        className={`h-48 ${
          isLandscape ? 'h-auto w-2/6 rounded-l-lg' : 'rounded-t-lg'
        } flex-none bg-cover bg-center text-center overflow-hidden`}
        style={{ backgroundImage: `url(${Hero})` }}
        title={title}
      ></div>

      <div
        className={` border border-[#DFDFDF] bg-white p-4 flex flex-col justify-between leading-normal 
        ${isLandscape ? 'rounded-r-lg h-[150px] md:h-[250px] w-full' : 'rounded-b-lg h-[200px] 2xl:h-[250px]'}`}
      >
        <div className="mb-8">
          {isOpen && (
            <div
              ref={dialogRef}
              className={`absolute mt-8
                ${isLandscape ? 'ml-45 md:ml-120 lg:ml-415 xl:ml-450' : 'ml-25 md:ml-45 lg:ml-55'}
               bg-white rounded-[5px] border border-[#DFDFDF] shadow-md`}
            >
              <div className="min-w-[80px]">
                <ul className="divide-y divide-[#DFDFDF] text-center">
                  <li>
                    <button
                      onClick={() =>
                        navigate(Routes.POST_DETAILS.replace(':id', postId))
                      }
                      className="cursor-pointer py-1 text-black hover:bg-gray-300 rounded-t-[5px] w-full"
                    >
                      Editar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onDelete}
                      className="cursor-pointer py-1 text-red-500 hover:bg-gray-300 rounded-b-[5px] w-full"
                    >
                      Deletar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex items-end">
            <span
              className="flex-1 capitalize text-gray-900 font-bold text-xl mb-2 line-clamp-2"
              title={title} // mostra o título completo ao passar o mouse
            >
              {title}
            </span>
            {isLoggedIn && (
              <button
                ref={buttonRef}
                onClick={handleDialogOpen}
                className="flex-shrink-0 text-black font-bold ml-2"
              >
                <DotsThreeVertical className="w-10 h-10 cursor-pointer" />
              </button>
            )}
          </div>

          <p className="capitalize text-gray-700 text-base line-clamp-4 md:line-clamp-6 pt-3">
            {description}
          </p>
        </div>

        <div className="flex justify-between">
          <data className="text-left italic text-gray-400">{formatted}</data>
          <p className="capitalize text-right italic truncate w-40">
            Aut.: {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
