import { useEffect, useState } from 'react'
import Icon from './assets/icon.svg'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <>
      <div>
      <img src={Icon} className="logo" alt="Vite logo" />
      </div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App
