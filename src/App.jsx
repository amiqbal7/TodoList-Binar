import React from "react";
import { useState } from "react";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";

const App = () => {
  // State untuk input baru yang akan ditambahkan ke list
  const [input, setInput] = useState("");

  // State untuk list todo
  const [todos, setTodos] = useState([]);

  // State untuk input search
  const [search, setSearch] = useState("");

  // Fungsi untuk menambahkan todo baru ke list saat form submit
  const addTodo = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      setTodos([...todos, { activity: input }]);
      setInput("");
    }
  };

  // Fungsi untuk menandai todo yang sudah selesai dengan toggle
  const handleClick = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  // Fungsi untuk menghapus todo dari list
  const removeTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  // Fungsi untuk menghapus semua todo dari list
  const handleRemoveAll = () => {
    setTodos([]);
  };

  // Fungsi untuk menyelesaikan semua todo pada list
  const handleComplatedAll = () => {
    const newTodos = todos.map((todo) => {
      return {
        ...todo,
        isCompleted: true,
      };
    });
    setTodos(newTodos);
  };

  // Fungsi untuk mengedit todo pada list
  const handleEditTodo = (index) => {
    const newTodos = [...todos];
    const editedTodo = newTodos[index].activity;
    setInput(editedTodo);
    setTodos(newTodos.filter((todo, i) => i !== index));
  };

  // Fungsi untuk filter todos sesuai dengan input search
  const filterTodos = (todos) => {
    return todos.filter((todo) =>
      todo.activity.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="m-16">
      <div className="container grid justify-items-center mx-auto px-5 bg-sky-500 max-w-4xl shadow-xl">
        <div className="text-center py-10 border-emerald-400">
          <h1 className="font-bold text-3xl text-white">My TodoList :</h1>
        </div>
        <div className="gap-4 flex">
          <div className="pb-7 ">
            {/* form yang akan ditambahkan ke list */}
            <form onSubmit={addTodo} className="flex">
              <div className="mt-[0.5px] mb-[-5px]">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Create your todo"
                  className="pb-1 rounded-l-md border-blue-700 pl-2 border-4 text-xl"
                  value={input}
                />
                <button
                  className="bg-blue-700 rounded-none rounded-r-sm px-3  py-1 text-white text-1xl font-bold"
                  type="submit"
                >
                  <h1 className="py-[3px] pb-[3.5px]">Add</h1>
                </button>
              </div>
            </form>
            {/* input search bar */}
            <div className="mt-3">
              <h1 className="text-white font-semibold text-center">
                Todo Search
              </h1>
              <input
                type="text"
                placeholder="Search"
                className="px-2 py-1 w-full rounded-md border-blue-700 border-2 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* list todo yang akan ditambahkan ke list */}
        {filterTodos(todos).map((todo, index) => (
          <div
            key={index}
            className="container max-w-xl border border-blue-500 mb-5 px-6 truncate bg-white"
          >
            {/* button yang berfungsi menambahkan, menghapus, mengedit, mengubah status list */}
            <div className="flex justify-between py-3 ">
              <div className="truncate pr-3">
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.activity}
                </span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleClick(index)} className="px-1">
                  {todo.isCompleted ? (
                    <p className="px-[7px]"> </p>
                  ) : (
                    <FaCheck />
                  )}
                </button>
                <button className="px-1 " onClick={() => removeTodo(index)}>
                  <FaTrash />
                </button>
                <button
                  name="edit"
                  className="pl-1 pr-0.5"
                  onClick={() => handleEditTodo(index)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* button done all dan remove all */}
        <div className="flex gap-2 font-bold ">
          <button className=" py-1 mb-4 px-3" onClick={handleComplatedAll}>
            Done all tasks
          </button>
          <button className=" py-1 mb-4 px-3" onClick={handleRemoveAll}>
            Remove all tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
