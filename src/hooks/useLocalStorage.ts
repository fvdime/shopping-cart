import { useEffect, useState } from "react"


//making generic type with the T, it can be any type you want
export function useLocalStorage <T> (key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        // this fixes some TypeScript issues, Typescript thinks the T could be a function 
        if (typeof initialValue === 'function') {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}