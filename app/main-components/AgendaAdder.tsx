"use client"

import React, { useState, ChangeEvent } from 'react';

interface Agenda {
  title: string;
  startTime: string;
  endTime: string;
}

interface AgendaTrackerProps{
    handleInputChange: ()=>void;
    handleAddAgenda: () =>void;
    newAgenda: String;
}

const AgendaTracker: React.FC = () => {
  const [agendas, setAgendas] = useState<string[]>([]);
  const [newAgenda, setNewAgenda] = useState<Agenda>({
    title: '',
    startTime: '',
    endTime: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setNewAgenda((prevAgenda) => ({
      ...prevAgenda,
      [name]: value,
    }));
  };

  const handleAddAgenda = (): void => {
    if (newAgenda.title && newAgenda.startTime && newAgenda.endTime) {
      setAgendas((prevAgendas) => [
        ...prevAgendas,
        JSON.stringify(newAgenda, null, 2),
      ]);
      setNewAgenda({
        title: '',
        startTime: '',
        endTime: '',
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleAddAnotherAgenda = (): void => {
    if (newAgenda.title && newAgenda.startTime && newAgenda.endTime) {
      setAgendas((prevAgendas) => [
        ...prevAgendas,
        JSON.stringify(newAgenda, null, 2),
      ]);
      setNewAgenda({
        title: '',
        startTime: '',
        endTime: '',
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSubmitAgendas = ():void =>{

  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Agenda Tracker</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          name="title"
          value={newAgenda.title}
          onChange={handleInputChange}
          className="border rounded py-2 px-3 w-full"
        />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <label className="block text-gray-700">Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={newAgenda.startTime}
          onChange={handleInputChange}
          className="border rounded py-2 px-3"
        />

        <label className="block text-gray-700">End Time:</label>
        <input
          type="time"
          name="endTime"
          value={newAgenda.endTime}
          onChange={handleInputChange}
          className="border rounded py-2 px-3"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleAddAgenda}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Agenda
        </button>
        <button
          onClick={handleAddAnotherAgenda}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Another Agenda
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Agendas:</h3>
        <ul>
          {agendas.map((agenda, index) => (
            <li key={index} className="mb-2">
              <pre>{agenda}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgendaTracker;
