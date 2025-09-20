import Card from '../presenters/components/cards/';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <Card
        title={'Teste'}
        description={
          'Em função das demandas emergentes, o desenvolvimento contínuo de distintas formas de atuação ancora-se em pressupostos teóricos consistentes das condições financeiras e administrativas exigidas. Nunca é demais lembrar o peso e '
        }
        author={'julio'}
        createDate={'18/09/2025'}
      />
    </div>
  );
}

export default App;
