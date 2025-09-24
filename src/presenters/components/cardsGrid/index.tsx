import React, { useState, useRef } from 'react';
import Hero from '../../assets/Hero.png';
import { DotsThreeVertical } from 'phosphor-react';
import { FormatUpperAndCharacterLimiter } from '../utils/format';
import { useClickOutside } from '../../../hooks/click/clickAway'; // <-- importa o hook

interface CardProps {
  title: string;
  description: string;
  author: string;
  createDate?: string;
}

const CardGrid: React.FC<CardProps> = ({
  title,
  description,
  author,
  createDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null); // Mudamos para div (mais flexível que <dialog>)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDialogOpen = () => setIsOpen(prev => !prev);

  // Usa o hook para detectar clique fora
  useClickOutside([dialogRef, buttonRef], () => setIsOpen(false)); // garante que o botão não fecha o menu ao clicar nele

  return (
    <article
      className="w-[80vw] min-w-[100px] max-w-[300px]
      h-[80vw] min-h-[250px] max-h-[450px]
      rounded-[10px]
      bg-white
      border 
      border-[#DFDFDF] 
      relative
      justify-between "
    >
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleDialogOpen}
          className="absolute right-2 top-2 border-none cursor-pointer text-black"
        >
          <DotsThreeVertical size={24} weight="bold" />
        </button>

        {isOpen && (
          <div
            ref={dialogRef}
            className="absolute mt-2 z-30 bg-white rounded-[5px] border border-[#DFDFDF] shadow-md
      2xl:left-45 2xl:top-8
      xl:left-85 xl:top-15
      lg:left-95 lg:top-15
      md:left-60 md:top-8
      sm:left-60 sm:top-8
      left-60 top-8
      "
          >
            <div className="min-w-[120px]">
              <ul className="divide-y divide-[#DFDFDF] text-center">
                <li className="cursor-pointer py-1 text-black hover:bg-gray-300">
                  Editar
                </li>
                <li className="cursor-pointer py-1 text-red-800 hover:bg-gray-300">
                  Deletar
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="text-black h-[62%] flex flex-col justify-between mt-[10px] p-[20px]">
        <h2 className="line-clamp-2 font-bold text-xl">
          {FormatUpperAndCharacterLimiter(title)}
        </h2>
        <p className="line-clamp-5">
          {FormatUpperAndCharacterLimiter(description)}
        </p>
        <div className="flex justify-between items-center">
          <data className="text-left italic text-gray-400">{createDate}</data>
          <p className="text-right italic">
            Criado por: {FormatUpperAndCharacterLimiter(author, 20)}
          </p>
        </div>
      </div>

      <img
        src={Hero}
        alt={title}
        className="w-full h-[40%] object-cover bg-center bg-no-repeat rounded-b-[10px]"
      />
    </article>
  );
};

export default CardGrid;
