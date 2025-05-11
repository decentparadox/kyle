import React from 'react';
import { type Scene } from '../types';
import { ChevronRight } from 'lucide-react';

interface SceneListProps {
  scenes: Scene[];
  activeSceneId: string;
  onSceneSelect: (sceneId: string) => void;
}

export default function SceneList({ scenes, activeSceneId, onSceneSelect }: SceneListProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Scenes</h2>
        <div className="space-y-2">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSceneSelect(scene.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                activeSceneId === scene.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <ChevronRight
                size={16}
                className={`mr-2 ${
                  activeSceneId === scene.id ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
              <span className="truncate">{scene.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}