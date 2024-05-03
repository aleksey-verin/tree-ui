'use client'
import { useEffect, useState } from 'react'
import TreeUl from './tree/tree-ul'
import Dropdown from '../ui/dropdown/dropdown'
import { useAppDispatch, useAppSelector } from '@/libs/hooks'
import {
  addTreeItem,
  deleteTreeItem,
  getInitialTreeData,
  selectorTreeDataSlice,
  setActiveItem,
  setEditingId,
} from '@/store/reducers/treeDataSlice'
import Loader from '../ui/icons/loader'
import { TreeNode } from '@/store/reducers/types/treeDataTypes'

const Tree = () => {
  const dispatch = useAppDispatch()
  const { treeData, activeItem, isLoading, isSuccess, isError } = useAppSelector(selectorTreeDataSlice)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pointsForContextMenu, setPointsForContextMenu] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    dispatch(getInitialTreeData())
  }, [dispatch])

  useEffect(() => {
    const handleClick = () => setIsMenuOpen(false)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const handleAddDocumentInContextMenu = () => {
    if (!activeItem) return
    dispatch(
      addTreeItem({ type: 'document', parentOrGroupId: activeItem.id, name: 'Новый документ' })
    )
  }
  const handleAddGroupInContextMenu = () => {
    if (!activeItem) return
    dispatch(addTreeItem({ type: 'group', parentOrGroupId: activeItem.id, name: 'Новая группа' }))
  }
  const handleEditItemInContextMenu = () => {
    if (!activeItem) return
    dispatch(setEditingId(activeItem.id))
  }
  const handleDeleteItemInContextMenu = () => {
    if (!activeItem) return
    dispatch(deleteTreeItem({ id: activeItem?.id, type: activeItem?.type }))
  }

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>, item: TreeNode) => {
    e.preventDefault()
    setIsMenuOpen(true)
    setPointsForContextMenu({
      x: e.pageX,
      y: e.pageY,
    })
    dispatch(setActiveItem(item))
  }

  const disableDefaultContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
  }

  if (isError) {
    return <div>Ошибка получения данных</div>
  }

  return (
    <div
      className='w-full py-8 pl-4 pr-8 border bg-white dark:bg-gray-950 border-blue-400 dark:border-gray-600 rounded-2xl relative'
      onContextMenu={disableDefaultContextMenu}
    >
      <TreeUl
        nodes={treeData}
        handleContextMenu={handleContextMenu}
      />
      {isMenuOpen && (
        <Dropdown
          points={pointsForContextMenu}
          item={activeItem}
          addDocument={handleAddDocumentInContextMenu}
          addGroup={handleAddGroupInContextMenu}
          editItem={handleEditItemInContextMenu}
          deleteItem={handleDeleteItemInContextMenu}
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
