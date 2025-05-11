import { useNavigate } from 'react-router-dom';
import { getAllStoryboards, deleteStoryboard } from '../utils/storage';
import Transition from "../components/Transistion"
import { DockMenu } from '../components/DockMenu';
export default function Home() {
  const navigate = useNavigate();
  const storyboards = getAllStoryboards();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this storyboard?')) {
      deleteStoryboard(id);
      navigate('/');
    }
  };
  return (
    <div>
    {/* <Banner /> */}
    <DockMenu />
    <div className="background flex items-center justify-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)] overflow-hidden text-white">
    <Transition>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center overflow-hidden">
        
        <img className="h-[96px]" src="./Logo.png" alt="Kyle logo" width={96} height={96}/>
        <h1 className="text-[48px] font-editorial">Kyle</h1>
        
        <div className="flex gap-4 bg-[#45723F] text-[#ADC686] px-4 py-2 rounded-xl cursor-pointer" onClick={()=> navigate("/new")}>
          <p>Create a new board</p>
          <img src="./right-arrow.svg" alt="" />
        </div>

        <div className="flex gap-4 flex-col items-center">
          <p className="opacity-50 text-[16px]">or open exisisting board</p>
        <div className='flex flex-col items-center gap-1 w-[500px]'>
        {storyboards.map((board) => (
          <div className="min-w-[250px] w-fit flex gap-4 bg-[#45723F] bg-opacity-50 text-[#ADC686] px-2 py-2 rounded-xl items-center justify-between">
            <p>{board.name}</p>
            <div className="flex gap-2 items-center">
              <img src="./trash.svg" className="h-4 w-4" onClick={() => handleDelete(board.id)} />
              <div className="bg-[#10C500] rounded-xl px-4 py-1 text-white cursor-pointer" onClick={() => navigate(`/board/${board.id}`)}>
                <p>open</p>
              </div>
            </div>
          </div>
          ))}
          </div>
        </div>

        <div className="flex opacity-40 mt-[140px] gap-9">
          <p>License</p>
          <p>Tutorial</p>
          <p>Github</p>
        </div>
        </main>
        </Transition>
    </div>
  </div>
  );
}