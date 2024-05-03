import Tree from '@/components/tree/tree'
import StoreProvider from './store-provider'

export default function Home() {
  return (
    <main className='grid min-h-screen p-4 grid-cols-2'>
      <StoreProvider>
        <Tree />
      </StoreProvider>
    </main>
  )
}
