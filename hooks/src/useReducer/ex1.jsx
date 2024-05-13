import {useReducer} from "react";

function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {count: state.count + 1, showText: state.showText}
        case 'toggleShowText':
            return {count: state.count, showText: !state.showText}
        default:
            throw new Error ('unkown action: ' + action.type) ;
    }
}

function ReducerExample1() {
    const [state, dispatch] = useReducer(reducer,
        {count: 0, showText: true})

    return (
        <div>
            <h1>{state.count}</h1>
            <button onClick={() => {
                dispatch({type: 'INCREMENT'});
                dispatch({type: 'toggleShowText'})
            }}
            >Click here</button>


            {state.showText && <p>This a text</p>}
        </div>
    )
}

export {ReducerExample1}