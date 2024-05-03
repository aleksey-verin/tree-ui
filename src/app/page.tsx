import Tree from '@/components/tree/tree'
import StoreProvider from './store-provider'

export default function Home() {
  return (
    <main className='grid min-h-screen p-2 lg:p-4 grid-cols-1 lg:grid-cols-2'>
      <StoreProvider>
        <Tree />
      </StoreProvider>
    </main>
  )
}
