export function debounce(func, timeout = 500){
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
        func()}, timeout)
}