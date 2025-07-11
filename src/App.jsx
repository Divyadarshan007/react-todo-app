import Todo from "./components/Todo"


const App = () => {
    
    return (
        <section
            className="min-h-screen overflow-auto bg-zinc-950 py-2 px-2 sm:px-4"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            }}>
            <Todo />
        </section>
    )
}

export default App