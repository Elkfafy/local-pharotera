import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, CheckCircle, XCircle, Edit2 } from 'lucide-react';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API = "";
  useEffect(() => {
    fetchTasks();
  }, []);
 
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API + '/api/tasks');
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(API + '/api/tasks', {
        title: newTask
      });
      setTasks([response.data, ...tasks]);
      setNewTask('');
      setError(null);
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task. Please try again.');
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await axios.put(API + `/api/tasks/${task._id}`, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => 
        t._id === task._id ? { ...t, completed: !t.completed } : t
      ));
      setError(null);
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(API + `/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      await axios.put(API + `/api/tasks/${editingTask._id}`, {
        title: editingTask.title
      });
      setTasks(tasks.map(t => 
        t._id === editingTask._id ? editingTask : t
      ));
      setEditingTask(null);
      setError(null);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={addTask} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add Task
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow">
          {tasks.map(task => (
            <div
              key={task._id}
              className="p-4 border-b border-gray-200 flex items-center justify-between"
            >
              {editingTask?._id === task._id ? (
                <form onSubmit={updateTask} className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task)}
                      className={`${
                        task.completed ? 'text-green-500' : 'text-gray-400'
                      } hover:text-green-600`}
                    >
                      {task.completed ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="p-4 text-gray-500 text-center">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;