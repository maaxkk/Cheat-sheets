import {useEffect, useMemo, useState} from "react";

function MemoExample1() {
    const [data, setData] = useState(null);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(comments =>
                setData(comments))
    }, [])

    // we can use useMemo to not compute everytime longest comment, if comments do not change
    const findLongestComment = (comments) => {
        if (!comments) return null;
        let longestName = "";
        for (let i = 0; i < comments.length; i++) {
            let currName = comments[i];
            if (currName.body.length > longestName.length) {
                longestName = currName.body;
            }
        }
        console.log('this was computed because of re-render')
        return longestName;
    }

    const findLongestCommMemo = useMemo(() => findLongestComment(data), [data])

    return (
        <div>
            {findLongestCommMemo}
            <button onClick={() => setToggle(prev => !prev)}>
                Toggle
            </button>
            {toggle && <p>Toggled</p>}
        </div>
    )

}

export {MemoExample1}