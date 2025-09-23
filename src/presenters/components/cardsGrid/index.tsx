import { useState } from 'react';
import Hero from '../../assets/Hero.png';
import { DotsThreeVertical } from 'phosphor-react';

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

  const handleDialogOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article
      className=" w-[80vw] min-w-[100px] max-w-[200px]
      h-[80vw] min-h-[200px] max-h-[300px]
      rounded-[10px]
      border 
      border-[#DFDFDF] 
      flex 
      flex-col 
      justify-between 
      relative"
    >
      <button
        onClick={handleDialogOpen}
        className="ml-auto z-10 bg-inherit border-none cursor-pointer"
      >
        <DotsThreeVertical size={24} weight="bold" />
      </button>

      {isOpen && (
        <dialog
          open
          className="absolute mt-[22px] ml-[67px] z-30 bg-white rounded-[5px] border border-[#DFDFDF] "
        >
          <div className="min-w-[120px]">
            <ul className="divide-y-1 divide-[#DFDFDF] text-center">
              <li className="list-none cursor-pointer transition-colors">
                Editar
              </li>
              <li className="list-none cursor-pointer transition-colors">
                Deletar
              </li>
            </ul>
          </div>
        </dialog>
      )}
      <div className="pt-[10px] pl-[20px] pr-[10px] space-y-3 -mt-[30px]">
        <h2 className="line-clamp-2">{title}</h2>
        <p className="line-clamp-5 mt-[5px] mr-[10px]">{description}</p>
        <div className="flex justify-between items-center">
          <data className="text-left italic mt-[15px]">{createDate}</data>
          <p className="text-right italic mt-[15px]">Criado por: {author}</p>
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
