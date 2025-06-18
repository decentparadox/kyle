import { useNavigate } from 'react-router-dom';

export default function Ai() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen h-auto p-8 gap-16 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex flex-col gap-4 text-[20px] p-4">
          <h1 className="font-editorial text-[24px]">Ai Coming soon</h1>
        </div>
      </main>
    </div>
  );
}