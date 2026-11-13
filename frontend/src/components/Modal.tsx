import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  titulo: string;
  onFechar: () => void;
  children: ReactNode;
}

// Janela genérica: reaproveitada nos detalhes e no formulário
export function Modal({ titulo, onFechar, children }: ModalProps) {
  // Fecha com a tecla Esc
  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === 'Escape') onFechar();
    }
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [onFechar]);

  return (
    // Fundo escurecido: clicar fora da janela também fecha
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-marca-escuro/60 p-4"
      onClick={onFechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-xl sm:p-8"
        onClick={(evento) => evento.stopPropagation()} // clique dentro não fecha
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id="titulo-modal" className="text-xl font-bold text-marca-azul">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-marca-cinza transition hover:bg-gray-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
