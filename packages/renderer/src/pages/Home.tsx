import { useNavigate } from 'react-router-dom';
import { useStoryboards } from '../contexts/StoryboardContext';
import { DockMenu } from '../components/DockMenu';

export default function Home() {
  const navigate = useNavigate();
  const { storyboards } = useStoryboards();

  return (
    <>
      <div className="background flex items-center justify-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)] overflow-hidden">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

          <div className="text-center">
            
            <h1 className="text-[48px] font-editorial">Kyle</h1>
            
            <div className="flex gap-4 px-4 py-2 rounded-xl cursor-pointer" onClick={()=> navigate("/new")}>
              <span>New Board +</span>
            </div>

            <p className="opacity-50 text-[16px]">or open exisisting board</p>

            {storyboards.map((board) => (
              <div className="min-w-[250px] w-fit flex gap-4 px-2 py-2 rounded-xl items-center justify-between">
                <div className="">{board.title}</div>
                
                <div className="rounded-xl px-4 py-1 cursor-pointer" onClick={() => navigate(`/board/${board.id}`)}>
                  Open
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <DockMenu />
    </>
  );
}