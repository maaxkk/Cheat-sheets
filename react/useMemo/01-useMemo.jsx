function TodoList2() {
    const [todos, setTodos] = useState(initialTodos);
    const [showActive, setShowActive] = useState(false);
    const [text, setText] = useState('');

    // useMemo caches value between re-renders, and if dependencies are the same, it does not do new recalculating
    // for example getVisibleTodos is heave operation and we don't want to recalculate it each time component re-renders
    // because todos or showActive might not have changed, and we just recalculate it again. Solutin -> use useMemo
    // useMemo will compare dependencies, if they have not changed we dont recalculate value
    const visibleTodos = useMemo(() => {
        return getVisibleTodos(todos, showActive)
    }, [todos, showActive])

    // const [visibleTodos, setVisibleTodos] = useState([]);
    //
    // useEffect(() => {
    //     setVisibleTodos(getVisibleTodos(todos, showActive));
    // }, [todos, showActive]);

    function handleAddClick() {
        setText('');
        setTodos([...todos, createTodo(text)]);
    }

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={showActive}
                    onChange={e => setShowActive(e.target.checked)}
                />
                Show only active todos
            </label>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick}>
                Add
            </button>
            <ul>
                {visibleTodos.map(todo => (
                    <li key={todo.id}>
                        {todo.completed ? <s>{todo.text}</s> : todo.text}
                    </li>
                ))}
            </ul>
        </>
    );
}