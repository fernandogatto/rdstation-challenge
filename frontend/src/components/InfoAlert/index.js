import { Info } from 'lucide-react';

export default function InfoAlert() {
  return (
    <div className="flex items-center p-4 mb-4 text-blue-500 border border-blue-300 rounded-lg bg-blue-50">
      <Info className="flex-shrink-0 w-5 h-5 mr-3" />
      <div className="text-sm font-medium">
        Por padrão, tipo de recomendação é Múltiplos Produtos.
      </div>
    </div>
  );
}
