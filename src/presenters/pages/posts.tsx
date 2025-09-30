import { useState } from 'react';
import PostCard from '../components/postCard';
import { Funnel, SquaresFour, ListBullets } from 'phosphor-react';

const Posts = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <div>
      <div className="p-12">
        <h1 className="font-bold text-5xl text-black">All Posts</h1>

        {/* Filters */}
        <div className=" mt-4 md:mt-10 flex flex-wrap justify-between items-center  gap-4 ">
          {/* Left */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="🔎 Digite aqui..."
              className="p-3 rounded-[10px] text-3xl flex-1
              w-[300px] lg:w-[400px] h-[40px] lg:h-[50px]
              bg-gray-200 
              border border-black focus:outline-none focus:border-red-500
             placeholder-gray-400 text-black"
            />
            <Funnel size={40} className="text-black md:ml-0 xl:ml-10 " />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:justify-center md:justify-end">
            <button
              className="bg-black text-white
              h-[40px] lg:h-[50px]
              w-[150px] md:w-[200px] lg:w-[300px]
              rounded-[10px]
              sm:p-4 lg:p-2
            hover:bg-gray-500 "
            >
              <span className="text-2xl md:text-3xl lg:text-5xl 2xl:text-4xl">
                Criar novo post
              </span>
            </button>
            <SquaresFour
              onClick={() => setIsLandscape(false)}
              size={40}
              className={` ml-45 md:ml-0 ${isLandscape ? 'text-black' : 'text-red-600'}`}
            />
            <ListBullets
              onClick={() => setIsLandscape(true)}
              size={40}
              className={`${isLandscape ? 'text-red-600' : 'text-black'}`}
            />
          </div>
        </div>

        {/* Cards All Posts */}
        <div
          className={`mt-12 md:mt-16 grid justify-items-center ${
            isLandscape
              ? 'gap-5 justify-items-centergrid-cols-1'
              : 'gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-7 2xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'
          }`}
        >
          <PostCard
            title={'Testandogjbjbjyyytnon bposnfomboimsgoigmdpo'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />{' '}
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />{' '}
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />{' '}
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />{' '}
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
          <PostCard
            title={'Testando'}
            description={
              'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a adoção de políticas descentralizadoras reforça a necessidade de ajustes dinâmicos dos modos de operação convencionais. Todas estas questões, devidamente ponderadas, levantam dúvidas sobre se a complexidade dos estudos efetuados traz consigo um leque de implicações práticas do sistema de participação geral. Considerando as lições aprendidas, a análise aprofundada dos indicadores-chave auxilia a preparação e a composição da gestão inovadora da qual fazemos parte. É claro que a revisão das métricas de desempenho requer um olhar atento sobre os desdobramentos das posturas dos órgãos dirigentes com relação às suas atribuições. Sob essa perspectiva, o fenômeno da Internet facilita a criação dos índices pretendidos. No escopo da atual conjuntura, o comprometimento entre as equipes estimula a padronização da fluidez dos cenários contemporâneos. Por conseguinte, a percepção das dificuldades modifica os parâmetros tradicionais de análise de alternativas às soluções ortodoxas. É importante questionar o quanto a '
            }
            author={'julio'}
            createDate={'29/09/2025'}
            isLandscape={isLandscape}
          />
        </div>
      </div>
    </div>
  );
};

export default Posts;
