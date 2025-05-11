import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { type Storyboard } from '../types';
import { saveStoryboard } from '../utils/storage';
import Transition from "../components/Transistion"
import { Input } from '../components/ui/input';
import { DockMenu } from '../components/DockMenu';
export default function NewBoard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    const newBoard: Storyboard = {
      id: uuidv4(),
      name,
      description,
      scenes: [
        {
          id: uuidv4(),
          title: 'Opening Scene',
          description: '',
          characters: [],
          location: '',
          duration: '',
          timeOfDay: '',
          cameraAngle: '',
          notes: '',
          order: 0,
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveStoryboard(newBoard);
    navigate(`/board/${newBoard.id}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)] overflow-hidden text-white bg-[#171717]">
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center overflow-hidden">
      <DockMenu />
      <Transition>
        <div className="flex flex-col gap-4 text-[20px] p-4">
          <h1 className="font-editorial text-[24px]">New board?</h1>
          <div className="flex flex-col gap-[2px]">
            <h2 className="text-[#ADC686]">Board Name</h2>
            <p className="text-[#ADC686] opacity-50">
              Pick a name for your new board
            </p>
            <Input
              placeholder="eg. yt video #41, College club shortfilm"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <h2 className="text-[#ADC686]">Description</h2>
            <p className="text-[#ADC686] opacity-50">
              Set description to specify this board
            </p>
            <Input
              placeholder="eg. Short film Storyboard, My new film project"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex gap-2">
              <div className="flex gap-4 bg-[#45723F]/15 text-[#ADC686] px-4 py-1 rounded-xl" onClick={()=> navigate("/")}>
                <img src="./right-arrow.svg" alt="" className="rotate-180" />
                <p>Back</p>
              </div>
            <div
              className="flex flex-1 items-center justify-center gap-4 bg-[#45723F] text-[#ADC686] px-4 py-1 rounded-xl"
              onClick={handleSubmit}
            >
              <p>Create</p>
              <img src="./right-arrow.svg" alt="" />
            </div>
          </div>
        </div>
      </Transition>
    </main>
  </div>
  );
}