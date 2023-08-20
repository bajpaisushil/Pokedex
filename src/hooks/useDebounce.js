function useDebounce(cb, delay=2000){
    let timerId;
    return (...arg)=>{
        clearTimeout(timerId);
        timerId=setTimeout(()=>{
            cb(...arg);
        }, delay)
    }
}

export default useDebounce;
