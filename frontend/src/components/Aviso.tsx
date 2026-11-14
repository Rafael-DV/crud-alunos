import { useEffect } from 'react';

interface AvisoProps {
  texto: string;
  onFechar: () => void;
}

export function Aviso({ texto, onFechar }: AvisoProps) {
  useEffect(() => {
    const temporizador = setTimeout(onFechar, 3500); 
    return () => clearTimeout(temporizador);
  }, [onFechar]);

  return (
    <div
      role="status"
      className="fixed right-4 bottom-4 left-4 z-60 flex items-center gap-3 rounded-full bg-marca-texto px-5 py-3.5 text-white shadow-xl sm:left-auto"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marca-menta text-marca-escuro">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="5 12 10 17 19 7" />
        </svg>
      </span>
      <span className="flex-1 text-[15px]">{texto}</span>
      <button
        type="button"
        onClick={onFechar}
        aria-label="Fechar aviso"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/10"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
    </div>
  );
}