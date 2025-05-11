import React from 'react';
import { type Scene } from '../types';

interface SceneEditorProps {
  scene: Scene;
  onUpdate: (updatedScene: Scene) => void;
}

export default function SceneEditor({ scene, onUpdate }: SceneEditorProps) {
  const handleChange = (field: keyof Scene, value: string | string[]) => {
    onUpdate({
      ...scene,
      [field]: value
    });
  };

  const handleCharacterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const characters = e.target.value.split('\n').filter(char => char.trim() !== '');
    handleChange('characters', characters);
  };

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <input
        type="text"
        value={scene.title}
        onChange={(e) => handleChange('title', e.target.value)}
        className="w-full text-2xl font-semibold mb-4 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Scene Title"
      />
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={scene.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Scene Location"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time of Day
          </label>
          <select
            value={scene.timeOfDay}
            onChange={(e) => handleChange('timeOfDay', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Time of Day</option>
            <option value="Dawn">Dawn</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            value={scene.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Scene Duration (e.g., '2 minutes')"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Camera Angle
          </label>
          <select
            value={scene.cameraAngle}
            onChange={(e) => handleChange('cameraAngle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Camera Angle</option>
            <option value="Wide Shot">Wide Shot</option>
            <option value="Medium Shot">Medium Shot</option>
            <option value="Close-Up">Close-Up</option>
            <option value="Extreme Close-Up">Extreme Close-Up</option>
            <option value="Bird's Eye View">Bird's Eye View</option>
            <option value="Low Angle">Low Angle</option>
            <option value="Dutch Angle">Dutch Angle</option>
            <option value="Over the Shoulder">Over the Shoulder</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Characters (one per line)
        </label>
        <textarea
          value={scene.characters.join('\n')}
          onChange={handleCharacterChange}
          className="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter character names (one per line)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scene Description
        </label>
        <textarea
          value={scene.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full h-[calc(100vh-500px)] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Write your scene description here..."
        />
      </div>
    </div>
  );
}