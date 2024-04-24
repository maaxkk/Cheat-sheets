import {useState} from "react";

function MovingDot() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    return (
        <div onPointerMove={e => {
            setPosition({
                // If you wanted to change only X, you should also copy other fields(y) -> setPosition({...position, x:100})
                ...position, x: e.clientX // change only X

                // fun
                // x: e.clientY,
                // y: e.clientX,

                // x: e.clientX,
                // y: e.clientY
            });
        }}
             style={{
                 position: 'relative',
                 width: '100vw',
                 height: '100vh',
             }}>
            <div style={{
                position: 'absolute',
                backgroundColor: 'red',
                borderRadius: '50%',
                transform: `translate(${position.x}px, ${position.y}px`,
                left: -10,
                top: -10,
                width: 20,
                height: 20,
            }}>
            </div>
        </div>
    )
}

// Avoid conditions in state
function FeedbackFormMore() {
    const [text, setText] = useState('');
    // if you forget to call setIsSent and setIsSending together you may end up in a situation where both isSending and
    // isSent are true at the time. since isSending and isSent should never be true it's better to replace them with one
    // status variable

    // const [isSending, setIsSending] = useState(false);
    // const [isSent, setIsSent] = useState(false);

    const [status, setStatus] = useState('typing')

    async function handleSubmit(e) {
        e.preventDefault();
        // setIsSending(true);
        setStatus('sending');
        await sendMessage(text); // simulate 2 seconds delivering message
        setStatus('sent');
        // setIsSending(false);
        // setIsSent(true);
    }
    const isSending = status === 'sending';
    const isSent = status === 'sent';

    if (isSent) {
        return <h1>Thanks for feedback</h1>
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>How was your stay at The Prancing Pony?</p>
            <textarea disabled={isSending} value={text} onChange={e => setText(e.target.value)}
            />
            <br/>
            <button disabled={isSending} type={'submit'}>
                Send
            </button>
            {isSending && <p>Sending...</p>}
        </form>
    );
}

// Pretend to send a message.
function sendMessage(text) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

// Avoid redundant state
function FormMore3() {
    // first variant, create fullName object with firstName and lastName

    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // const [fullName, setFullName] = useState({firstName: 'Max', lastName: 'Kk'})

    // second variant, use just 2 states, firstName and lastName => no need in fullName
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const fullName = firstName + ' ' + lastName;
    function handleFirstNameChange(e) {
        // setFirstName(e.target.value);
        // setFullName(e.target.value + ' ' + lastName)

        //1st
        // setFullName({...fullName, firstName: e.target.value})

        //2nd
        setFirstName(e.target.value)
    }

    function handleLastNameChange(e) {
        // setLastName(e.target.value);
        // setFullName(firstName + ' ' + e.target.value)

        //1st
        // setFullName({...fullName, lastName: e.target.value})

        //2st
        setLastName(e.target.value)
    }


    return (
        <>
            <h2>Let's check you in</h2>
            <label>
                First name:{' '}
                <input
                    // value={firstName}
                    //1st
                    // value={fullName.firstName}
                    //2nd
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            </label>
            <label>
                Last name:{' '}
                <input
                    // value={lastName}
                    //1st
                    // value={fullName.lastName}
                    //2nd
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            </label>
            <p>
                {/*Your ticket will be issued to: <b>{fullName.firstName + ' ' + fullName.lastName}</b>*/}
                Your ticket will be issued to: <b>{fullName}</b>
            </p>
        </>
    )

}

function TestApp() {
    const [testColor, setTestColor] = useState('blue')

    return (
        <>
            <button onClick={() => {
                setTestColor('red')
                console.log(testColor); // first click - render = blue, but then it's red, but message will still render blue
                // because we initialize color in Message only once on first render, and it does not have setState function
                // to re-render it, that's why it always will be blue.

                // React re-render component when component has changed props or state (useState)
                // but only if props was state of parent component, if parent's state changes it triggers re-render of
                // itself and its children if they exist

                // in our case yes we changed props(or state of parent)
                // but our bg-color depends on state, and state stayed the same, in memory of react(his shelf)
                // simple fix is to use variable for props instead of useState in child
                // or just pass props to inside return statement in child component
            }}>
                Red</button>
            <Message messageColor={testColor} />
        </>
    )
}

// Don't mirror props in state
function Message({messageColor}) {
    const [color, setColor] = useState(messageColor);
    return (
        // state(color) is the same for all renders, to change it we can use props, when props changes it will re-render correctly
        <div style={{ backgroundColor: color, width: 50, height: 50}}>
            {color}
        </div>
    )
}


export {MovingDot, FeedbackFormMore, FormMore3, TestApp}
