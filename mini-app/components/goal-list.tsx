"use client";

import { useState } from "react";

export interface Goal {
  name: string;
  target: string;
}

export default function GoalList() {
  const [name, setName] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [error, setError] = useState<string>("");

  const addGoal = () => {
    if (!name.trim() || !target.trim()) {
      setError("Please enter both the goal name and target value.");
      return;
    }
    setGoals([...goals, { name: name.trim(), target: target.trim() }]);
    setName("");
    setTarget("");
    setError("");
  };

  const deleteGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setGoals([]);
  };

  return (
    <section className="w-full max-w-md space-y-4">
      <h2 className="text-xl font-semibold">Portfolio Goal Setter</h2>
      <div className="flex flex-col gap-2">
        <label>
          Goal Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </label>
        <label>
          Target Value
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </label>
        <button
          onClick={addGoal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Goal
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Your Portfolio Goals</h3>
        {goals.length === 0 ? (
          <p>No goals added yet.</p>
        ) : (
          <ul className="space-y-1">
            {goals.map((goal, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {goal.name} – {goal.target}
                </span>
                <button
                  onClick={() => deleteGoal(index)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {goals.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        )}
      </div>
    </section>
  );
}
