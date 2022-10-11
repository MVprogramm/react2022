import { useState, useEffect } from 'react'

export function useDebounce(value: string, delay: number = 300) {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const index = setTimeout(() => setDebounced(value), delay)

        return () => clearTimeout(index)
    }, [value, delay])

    return debounced
}