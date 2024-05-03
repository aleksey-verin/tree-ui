'use client'
import { useEffect, useRef, useState } from 'react'
import AddFile from '../icons/add-file'
import AddFolder from '../icons/add-folder'
import Delete from '../icons/delete'
import Edit from '../icons/edit'
import { TreeNode } from '@/store/reducers/types/treeDataTypes'

const DropdownItem = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
) => {
  const { children, ...rest } = props
  return (
    <button
      {...props}
      className='text-gray-900 dark:text-gray-200 group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors hover:text-gray-100 dark:hover:text-blue-400 hover:bg-gray-600 dark:hover:bg-gray-900'
    >
      {children}
    </button>
  )
}

const Dropdown = ({
  points,
  item,
  addDocument,
  addGroup,
  editItem,
  deleteItem,
  // isMenuOpen,
  // setIsMenuOpen,
}: {
  points: { x: number; y: number }
  item: TreeNode | null
  addDocument: () => void
  addGroup: () => void
  editItem: () => void
  deleteItem: () => void
  // isMenuOpen: boolean
  // setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // const menuRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // Проверяем, что меню открыто и клик был не по меню и его потомкам
  //     if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
  //       console.log('закрываем меню');
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   // Добавляем обработчик клика для всего окна
  //   window.addEventListener('click', handleClickOutside);

  //   // Функция для очистки эффекта
  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isMenuOpen]); // Зависимость от состояния меню
  // // useEffect(() => {
  // //   const handleClick = () => setIsMenuOpen(false)
  // //   window.addEventListener('click', handleClick)
  // //   return () => {
  // //     window.removeEventListener('click', handleClick)
  // //   }
  // // }, [])

  console.log(points, screenWidth)
  const menuWidth = 220
  const isFreeSpace = screenWidth - points.x > menuWidth
  return (
    <div
    // ref={menuRef}
      style={{
        top: `${points.y - 20}px`,
        left: `${isFreeSpace ? points.x - 20 : points.x - menuWidth}px`,
      }}
      className='absolute mt-2 w-56 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-950 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none'
    >
      {item?.type === 'group' && (
        <div className='px-1 py-1 '>
          <DropdownItem onClick={addDocument}>
            <AddFile className='mr-2 h-5 w-5' aria-hidden='true' />
            Add document
          </DropdownItem>
          <DropdownItem onClick={addGroup}>
            <AddFolder className='mr-2 h-5 w-5' aria-hidden='true' />
            Add group
          </DropdownItem>
        </div>
      )}
      <div className='px-1 py-1 '>
        <DropdownItem onClick={editItem}>
          <Edit className='mr-2 h-5 w-5' aria-hidden='true' />
          Edit
        </DropdownItem>
      </div>
      {item?.type === 'group' && item?.parentId === null ? null : (
        <div className='px-1 py-1 '>
          <DropdownItem onClick={deleteItem}>
            <Delete className='mr-2 h-5 w-5' aria-hidden='true' />
            Delete
          </DropdownItem>
        </div>
      )}
    </div>
  )
}

export default Dropdown
