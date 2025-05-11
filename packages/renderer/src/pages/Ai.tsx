import Transition from "../components/Transistion"
import { DockMenu } from '../components/DockMenu';


export default function NewBoard() {

  return (
    <div className="flex items-center justify-center min-h-screen h-auto p-8 gap-16 font-[family-name:var(--font-geist-sans)] bg-[var(--background)] text-[var(--text)] overflow-hidden">
    <main className="flex flex-col gap-8 items-center sm:items-center overflow-hidden">
      <DockMenu />
      <Transition>
        <div className="flex flex-col gap-4 text-[20px] p-4">
          <h1 className="font-editorial text-[24px] text-[var(--text)]">Coming soon</h1>

        </div>
      </Transition>
    </main>
  </div>
  );
}