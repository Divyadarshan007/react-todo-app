import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Table = ({ tasks, setterTask, storeValue }) => {
    const [displayTask, setDisplayTask] = useState([]);

    useEffect(() => {
        const filtered = tasks.filter((task) =>
            storeValue === "pending" ? !task.isCompleted :
            storeValue === "completed" ? task.isCompleted :
            true
        );
        setDisplayTask(filtered);
    }, [tasks, storeValue]);

    const updateStatus = (id) => {
        const updated = tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: true } : task
        );
        setterTask(updated);
    };

    const deleteTask = (id) => {
        const updated = tasks.filter((task) => task.id !== id);
        setterTask(updated);
    };

    return (
        <div className="relative scrollbar overflow-x-auto">
            <AnimatePresence>
                {displayTask.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: task.isCompleted ? -24 : 24 }}
                        layout
                        className="bg-white p-4 shadow-sm border-b my-3 rounded-xl flex flex-col md:flex-row md:items-center gap-4"
                    >
                        {/* Task Name */}
                        <div className="flex-1 flex items-center gap-3 text-md font-mono font-semibold text-gray-900">
                            <span className="w-2.5 h-2.5 bg-black rounded-full inline-block"></span>
                            <span className="break-words">{task.taskName}</span>
                        </div>

                        {/* Status Button */}
                        <div className="md:w-auto text-center">
                            {task.isCompleted ? (
                                <button
                                    disabled
                                    className="text-green-900 rounded-md bg-emerald-100 py-1 px-5 font-medium  md:w-auto"
                                >
                                    Completed
                                </button>
                            ) : (
                                <button
                                    onClick={() => updateStatus(task.id)}
                                    className="text-yellow-900 bg-yellow-100 rounded-md py-1 px-5 font-medium  md:w-auto"
                                >
                                    Pending
                                </button>
                            )}
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-end md:justify-center">
                            <button
                                className="text-xl text-red-500 hover:text-red-700"
                                onClick={() => deleteTask(task.id)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
export default Table;
