import { useRef, useState } from "react";
import Table from "./Table";
import { AnimatePresence, motion } from "motion/react";

const Todo = () => {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [storeValue, setStoreValue] = useState("all");
    const inputRef = useRef(null);
    const [date, setDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") return;

        const newTask = {
            id: Date.now(),
            taskName: text,
            isCompleted: false,
        };

        setTasks([...tasks, newTask]);
        inputRef.current.value = "";
        setText("");
    };

    return (
        <div className="max-w-4xl w-full mx-auto shadow-lg back-color my-10 px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-7">
                <div>
                    <h1 className="text-2xl font-semibold font-mono">Todo App</h1>
                    <span className="text-sm font-medium text-gray-500">{date.toDateString()}</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    <button
                        className={`rounded-md px-6 py-1 font-semibold shadow-md transition ${storeValue === "all" ? "bg-black text-white" : "bg-white text-black"}`}
                        onClick={() => setStoreValue("all")}
                    >
                        All
                    </button>
                    <button
                        className={`rounded-md px-6 py-1 font-semibold shadow-md transition ${storeValue === "pending" ? "bg-black text-white" : "bg-white text-black"}`}
                        onClick={() => setStoreValue("pending")}
                    >
                        Pending
                    </button>
                    <button
                        className={`rounded-md px-6 py-1 font-semibold shadow-md transition ${storeValue === "completed" ? "bg-black text-white" : "bg-white text-black"}`}
                        onClick={() => setStoreValue("completed")}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="px-4 sm:px-7 max-h-[500px] overflow-y-auto">
                {tasks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center"
                    >
                        <img src="/59563746_9318707.jpg" alt="No tasks" className="w-full max-w-sm" />
                        <span className="mt-4 text-xl text-center">No Task Yet</span>
                    </motion.div>
                ) : (
                    <Table tasks={tasks} setterTask={setTasks} storeValue={storeValue} />
                )}
            </div>

            {/* Input */}
            <form className="p-7" onSubmit={handleSubmit}>
                <div className="relative w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">
                    <input
                        ref={inputRef}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-4 pr-16 text-m text-gray-900 border-gray-300 rounded-full bg-gray-50 dark:bg-black dark:placeholder-gray-400 dark:text-white"
                        placeholder="Add Task"
                        required
                    />
                    <div className="w-10 h-10 rounded-full bg-[#333333] absolute right-2 bottom-2 flex items-center justify-center">
                        <button type="submit" className="text-white text-sm">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Todo;
