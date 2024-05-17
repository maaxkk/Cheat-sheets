import {useLocalStorage} from "../src/useCustomHooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import {useInput} from "../src/useCustomHooks/useInput.js";
import {useEffect} from "react";

// 1) useState ✅
// 2) useRef ✅
// 3) useEffect ✅
// 4) useMemo
// 5) useParams ✅
// 6) useNavigate ✅
// 7) useCallback
// 8) useLocalStorage(custom hook) ✅
// 9) useReducer
// 10) useSearchedParams
// 11) useContext

function Form() {
    const [personData, setPersonData] = useLocalStorage('personData')
    const navigate = useNavigate();


    function onChangeInput(e) {
        useInput(e, setPersonData)
        localStorage.setItem('personData', JSON.stringify(personData))
    }

    useEffect(() => {
        localStorage.setItem('personData', JSON.stringify(personData))
    }, [personData]);

    function submitFormHandler(e) {
        e.preventDefault();
    }

    function handleClick() {
        let username = `${personData.name}${personData.lastname}`.toLowerCase()
        navigate(`/profile/${username}?name=${personData.name}&lastname=${personData.lastname}`)
    }

    return (
        <div>
            <form onSubmit={submitFormHandler}>
                <input onChange={onChangeInput} name={'name'} value={personData.name} type="text"/>
                <input onChange={onChangeInput} name={'lastname'} value={personData.lastname} type="text"/>
                <input onChange={onChangeInput} name={'phone'} value={personData.phone} type="text"/>
                <input onChange={onChangeInput} name='email' value={personData.email} type="text"/>
                <input onChange={onChangeInput} name={'hobby'} value={personData.hobby} type="text"/>
            </form>
            <br/>
            <p>Name: {personData.name}</p>
            <p>Lastname: {personData.lastname}</p>
            <p>Phone number:{personData.phone}</p>
            <p>Email: {personData.email}</p>
            <p>Hobby: {personData.hobby}</p>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export {Form}