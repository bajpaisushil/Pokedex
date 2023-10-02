function useDebounce(cb, delay=1500){
    let timerId;
    return (...arg)=>{
        clearTimeout(timerId);
        timerId=setTimeout(()=>{
            cb(...arg);
        }, delay)
    }
}

export default useDebounce;
