import React from "react"

export default function Timer(props) {
    const [seconds, setSeconds] = React.useState(0)
    const [best, setBest] = React.useState(getInitState)

    console.log(getInitState())

    function getInitState() {
        let value = JSON.parse(localStorage.getItem("best"))
        return value!= null ? value : 0
    }

    React.useEffect(() => {
        if(props.toggleTimer()) {
            const interval = setInterval(() => {
                setSeconds(prev => prev+1)
            },1000)
    
            return ()=> clearInterval(interval)
        } else {
            if(seconds != 0) {
                if(seconds < best || best == 0) {
                    localStorage.setItem("best", JSON.stringify(seconds))
                    setBest(seconds)
                }
            }
            setSeconds(0)
            return
        }
    }, [seconds, props.tenzies])

    const styles = {
        color: seconds < best ? "green" : "red"
    }

    return (
        <>
            <p>Best score : {best}</p>
            <p style={styles}>{seconds}s</p>
        </>
    )
}