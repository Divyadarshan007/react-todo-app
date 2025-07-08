import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

const Table = ({ tasks, setterTask, storeValue }) => {
    const [displayTask, setDisplayTask] = useState([]);

    useEffect(() => {
        let filtertask = tasks.filter((task) => {
            return storeValue == "pending" ? !task.isCompleted : storeValue == "completed" ? task.isCompleted : true;
        })

        setDisplayTask(filtertask)

    }, [tasks, storeValue])


    const updateStatus = (id) => {
        let updatedTask = tasks.map((task) => {
            return task.id === id ? { ...task, isCompleted: true } : task;
        })
        setterTask(updatedTask);
    }

    const deleteTask = (id) => {
        let updatedTask = tasks.filter((task) => {
            return task.id != id
        })

        setterTask(updatedTask)
    }

    return (
        <div  className="">
            <div  className="relative scrollbar overflow-x-auto">
                <div className=" text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
                    <div className="w-full">
                        <AnimatePresence>
                            {displayTask.map((task) => {
                                return <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                    }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 25 }}
                                    key={task.id} className="bg-white px-5 shadow-sm border-b my-3 rounded-[10px] flex items-center">

                                    <div scope="" className="px-6 py-4 w-6/12 text-wrap text-md font-mono font-semibold text-gray-900  ">
                                        <div className="flex items-center w-full overflow-hidden gap-3">
                                            <div>
                                                <span className="w-[10px] h-[10px] bg-black inline-block rounded-[50%]"></span>
                                            </div>
                                            <div>
                                                {task.taskName}
                                            </div>
                                        </div>
                                    </div>
                                    {task.isCompleted ? <div className="px-6 py-4 w-4/12 text-center">
                                        <div>
                                            <button disabled className="text-green-900 rounded-md bg-emerald-100 py-1 px-7 font-medium">Completed</button>
                                        </div>

                                    </div> :
                                        <div className="px-6 py-4 w-4/12 text-center">
                                            <div>
                                                <button className="text-yellow-900 bg-yellow-100 rounded-md py-1 px-7 font-medium cursor-pointer" onClick={() => {
                                                    updateStatus(task.id);
                                                }}>Pending</button>
                                            </div>
                                        </div>
                                    }
                                    <div className="w-2/12">
                                        <div className="flex justify-end">
                                            <button className="text-xl" onClick={() => {
                                                deleteTask(task.id)
                                            }}><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>
                                </motion.div>
                            })}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table