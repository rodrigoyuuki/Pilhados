import React from 'react';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f9f0] font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          .font-sans {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      {/* Header */}
      <div className="relative w-full h-[150px] flex justify-between items-center bg-[#439e4a] p-5">
        <button className="absolute top-5 left-5 text-white text-3xl p-2 rounded-full hover:bg-green-700">
          &lt;
        </button>
        <button className="absolute top-5 right-5 text-white text-3xl p-2 rounded-full hover:bg-green-700">
          ≡
        </button>
        <div className="absolute inset-0 flex items-end justify-center">
            <div className="w-[120px] h-[120px] rounded-full bg-[#dcedc8] flex items-center justify-center -mb-[60px] border-[5px] border-[#f0f9f0] z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#2e7d32]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M11 7h2v6h-2z"/>
                    <path d="M11 15h2v2h-2z"/>
                </svg>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-5 pt-20 overflow-auto">
        <h1 className="text-3xl font-bold italic text-[#439e4a] mt-2 mb-8">
            Dicas
        </h1>
        
        {/* Tip Card */}
        <div className="w-full max-w-sm bg-[#f8ffe3] rounded-xl p-5 mb-5 shadow-md flex items-center space-x-4">
            <img src="https://placehold.co/80x80/dcedc8/4f4f4f?text=Foto" alt="Tip Image" className="rounded-lg" />
            <div className="flex-1">
                <h2 className="text-lg font-bold text-[#439e4a]">Comece a mudança!</h2>
                <p className="text-sm text-gray-700 mt-1">Comece a mudança ecológica em casa com pequenos passos, como separar o lixo reciclável e economizar água e energia!</p>
            </div>
            <button className="text-2xl text-[#439e4a]">→</button>
        </div>

        {/* Tip Card */}
        <div className="w-full max-w-sm bg-[#f8ffe3] rounded-xl p-5 mb-5 shadow-md flex items-center space-x-4">
            <img src="https://placehold.co/80x80/dcedc8/4f4f4f?text=Foto" alt="Tip Image" className="rounded-lg" />
            <div className="flex-1">
                <h2 className="text-lg font-bold text-[#439e4a]">Descarte de pilhas</h2>
                <p className="text-sm text-gray-700 mt-1">Você sabia que o descarte incorreto de pilhas pode liberar metais pesados no solo? Aprenda a fazer a separação correta desses resíduos.</p>
            </div>
            <button className="text-2xl text-[#439e4a]">→</button>
        </div>

        {/* Tip Card */}
        <div className="w-full max-w-sm bg-[#f8ffe3] rounded-xl p-5 mb-5 shadow-md flex items-center space-x-4">
            <img src="https://placehold.co/80x80/dcedc8/4f4f4f?text=Foto" alt="Tip Image" className="rounded-lg" />
            <div className="flex-1">
                <h2 className="text-lg font-bold text-[#439e4a]">Plante uma horta em casa</h2>
                <p className="text-sm text-gray-700 mt-1">Mesmo em espaços pequenos, é possível ter uma horta de temperos e chás. Isso garante alimentos mais saudáveis!</p>
            </div>
            <button className="text-2xl text-[#439e4a]">→</button>
        </div>
        
        {/* Tip Card */}
        <div className="w-full max-w-sm bg-[#f8ffe3] rounded-xl p-5 mb-5 shadow-md flex items-center space-x-4">
            <img src="https://placehold.co/80x80/dcedc8/4f4f4f?text=Foto" alt="Tip Image" className="rounded-lg" />
            <div className="flex-1">
                <h2 className="text-lg font-bold text-[#439e4a]">Descarte de aparelhos</h2>
                <p className="text-sm text-gray-700 mt-1">O descarte correto de aparelhos eletrônicos é essencial para o meio ambiente. Aprenda como fazer isso!</p>
            </div>
            <button className="text-2xl text-[#439e4a]">→</button>
        </div>

      </div>

      {/* Footer / TabBar */}
      <div className="flex justify-around items-center w-full h-[80px] bg-[#439e4a] text-white">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-[#e3ff92]" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-sm text-[#e3ff92]">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-[#e3ff92]" viewBox="0 0 24 24">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1h-6zm4-12v2h2V9h-2zm-4 0v2h2V9H9zm0 4v2h2v-2H9zm4 0v2h2v-2h-2zM12 2C8.13 2 5 5.13 5 9c0 4.47 4.14 7.23 6.2 9.47.16.17.43.17.59 0C14.86 16.23 19 13.47 19 9c0-3.87-3.13-7-7-7zm0 14c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span className="text-sm text-[#e3ff92]">Dicas</span>
        </div>
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-[#e3ff92]" viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
          </svg>
          <span className="text-sm text-[#e3ff92]">Calendário</span>
        </div>
      </div>
    </div>
  );
};

export default App;
