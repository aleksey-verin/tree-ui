'use client'
import { useEffect, useMemo, useState } from 'react'
import TreeUl from './tree/tree-ul'
import Dropdown from '../ui/dropdown/dropdown'
import { useAppDispatch, useAppSelector } from '@/libs/hooks'
import {
  addTreeItem,
  deleteTreeItem,
  getInitialTreeData,
  selectorTreeDataSlice,
  setEditingId,
} from '@/store/reducers/treeDataSlice'
import { buildTree, TreeNode } from '@/libs/libs'
import { documentsData, groupsData } from '@/data/data'
import Loader from '../ui/icons/loader'

const Tree = () => {
  const dispatch = useAppDispatch()
  const { treeData, isLoading, isSuccess, isError } = useAppSelector(selectorTreeDataSlice)
  const [activeItem, setActiveItem] = useState<TreeNode | null>(null)

  useEffect(() => {
    dispatch(getInitialTreeData())
  }, [dispatch])

  const handleActiveItem = (item: TreeNode) => {
    setActiveItem(item)
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    const handleClick = () => setIsMenuOpen(false)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const handleAddDocument = () => {
    if (!activeItem) return
    dispatch(
      addTreeItem({ type: 'document', parentOrGroupId: activeItem.id, name: 'Новый документ' })
    )
  }
  const handleAddGroup = () => {
    if (!activeItem) return
    dispatch(addTreeItem({ type: 'group', parentOrGroupId: activeItem.id, name: 'Новая группа' }))
  }
  const handleEditItem = () => {
    if (!activeItem) return
    dispatch(setEditingId(activeItem.id))
  }
  const handleDeleteItem = () => {
    if (!activeItem) return
    dispatch(deleteTreeItem({ id: activeItem?.id, type: activeItem?.type }))
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>, item: TreeNode) => {
    e.preventDefault()
    setIsMenuOpen(true)
    setPoints({
      x: e.pageX,
      y: e.pageY,
    })
    setActiveItem(item)
  }

  const disableContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }

  // if (isLoading) {
  //   return (
  //     <div className='w-full py-8 pl-4 pr-8 border border-blue-800 dark:border-gray-600 rounded-2xl text-center'>
  //       <div className='w-24'>
  //         <Loader />
  //       </div>
  //     </div>
  //   )
  // }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div
      className='w-full py-8 pl-4 pr-8 border border-blue-800 dark:border-gray-600 rounded-2xl relative'
      onContextMenu={disableContextMenu}
    >
      <TreeUl
        nodes={treeData}
        activeItem={activeItem}
        // isEditing={isEditing}
        handleActiveItem={handleActiveItem}
        handleContextMenu={handleContextMenu}
        // editingItem={editingItem}
        // setEditingItem={handleEditingItem}
      />
      {isMenuOpen && (
        <Dropdown
          points={points}
          item={activeItem}
          addDocument={handleAddDocument}
          addGroup={handleAddGroup}
          editItem={handleEditItem}
          deleteItem={handleDeleteItem}
        />
      )}
      {isLoading && (
        <div className='absolute w-24 right-2 top-[-20px]'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Tree
