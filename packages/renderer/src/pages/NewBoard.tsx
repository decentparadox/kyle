import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { type Storyboard } from '../types';
import { saveStoryboard } from '../utils/storage';
import Transition from "../components/Transistion"
import { Input } from '../components/ui/input';
import { DockMenu } from '../components/DockMenu';
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useStoryboards } from "../contexts/StoryboardContext";

export default function NewBoard() {
  const navigate = useNavigate();
  const { addStoryboard } = useStoryboards();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateBoard = () => {
    if (title.trim()) {
      const newBoard = {
        id: uuidv4(),
        title: title.trim(),
        description: description.trim(),
        scenes: [],
        characters: [],
        locations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addStoryboard(newBoard);
      navigate(`/board/${newBoard.id}`);
    }
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
                Give your storyboard a title that captures the essence of your project.
              </p>
              <Input
                placeholder="Enter board name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-[#ADC686]">Description</h2>
              <p className="text-[#ADC686] opacity-50">
                Provide a brief description to help you remember what this board is about.
              </p>
              <Textarea
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex gap-4 bg-[#45723F]/15 text-[#ADC686] px-4 py-1 rounded-xl" onClick={()=> navigate("/")}>
                <img src="./right-arrow.svg" alt="" className="rotate-180" />
                <p>Back</p>
              </div>
              <button
                className="flex flex-1 items-center justify-center gap-4 bg-[#45723F] text-[#ADC686] px-4 py-1 rounded-xl"
                onClick={handleCreateBoard}
              >
                Create Board
              </button>
            </div>
          </div>
        </Transition>
      </main>
    </div>
  );
}