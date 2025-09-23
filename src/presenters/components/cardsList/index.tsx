import { useState } from 'react';
import Hero from '../../assets/Hero.png';
import { DotsThreeVertical } from 'phosphor-react';

interface CardProps {
  title: string;
  description: string;
  author: string;
  createDate?: string;
}

const CardList: React.FC<CardProps> = ({
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
      className="w-[80vw] min-w-[400px] max-w-[800px] 
      h-[80vw] min-h-[100px] max-h-[200px] 
      rounded-[10px]
      border 
      border-[#DFDFDF] 
      flex 
      flex-row
      justify-between"
    >
      <img
        src={Hero}
        alt={title}
        className="w-[80vw] min-w-[75px] max-w-[250px]
         h-[80vw] min-h-100px] max-h-[200px] 
         object-cover bg-center bg-no-repeat rounded-l-[10px]"
      />
      <div className="pt-[10px] pl-[20px] pr-[10px] space-y-3 mt-[10px]">
        <h2 className="line-clamp-2">{title}</h2>
        <p className="line-clamp-5 mt-[5px] mr-[10px]">{description}</p>
        <div className="flex justify-between items-center mt-[15px]">
          <data className="text-left italic">{createDate}</data>
          <p className="text-right italic">Criado por: {author}</p>
        </div>
      </div>

      <div className="relative ">
        <button
          onClick={handleDialogOpen}
          className=" bg-inherit border-none cursor-pointer"
        >
          <DotsThreeVertical size={24} weight="bold" />
        </button>

        {isOpen && (
          <dialog
            open
            className="absolute -ml-[115px] -mt-[5px] rounded-[5px] border border-[#DFDFDF] bg-white shadow-lg open:flex"
          >
            <div className="min-w-[120px]">
              <ul className="divide-y-1 divide-[#DFDFDF] text-center">
                <li className="list-none cursor-pointer ">Editar</li>
                <li className="list-none cursor-pointer">Deletar</li>
              </ul>
            </div>
          </dialog>
        )}
      </div>
    </article>
  );
};

export default CardList;
