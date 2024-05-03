'use client'
import { useEffect, useRef, useState } from 'react'
import TreeUl from './tree-ul'
import clsx from 'clsx'
import FolderFullClosed from '@/components/ui/icons/folder-full-closed'
import FolderFullOpened from '@/components/ui/icons/folder-full-opened'
import FolderEmptyClosed from '@/components/ui/icons/folder-empty-closed'
import File from '@/components/ui/icons/file'
import { useAppDispatch, useAppSelector } from '@/libs/hooks'
import {
  editTreeItem,
  selectorTreeDataSlice,
  setActiveItem,
  setEditingId,
} from '@/store/reducers/treeDataSlice'
import { TreeNode } from '@/store/reducers/types/treeDataTypes'
import Dots from '@/components/ui/icons/dots'
import Check from '@/components/ui/icons/check'
import Cancel from '@/components/ui/icons/cancel'

function getImage(node: TreeNode, isFolderOpen: boolean, className?: string) {
  if (node.type === 'group') {
    if (node.children?.length === 0) {
      return <FolderEmptyClosed className={className} />
    }

    if (isFolderOpen) {
      return <FolderFullOpened className={className} />
    } else {
      return <FolderFullClosed className={className} />
    }
  } else {
    return <File className={className} />
  }
}

const TreeLi = ({
  node,
  handleContextMenu,
}: {
  node: TreeNode
  handleContextMenu: (e: React.MouseEvent<HTMLElement>, item: TreeNode) => void
}) => {
  const dispatch = useAppDispatch()
  const { activeItem, editingId } = useAppSelector(selectorTreeDataSlice)

  const [isFolderOpen, setIsFolderOpen] = useState(true)
  const [inputValue, setInputValue] = useState(node.label)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = (item: TreeNode) => {
    if (item.id === activeItem?.id) return
    dispatch(setActiveItem(item))
    dispatch(setEditingId(null))
  }

  const handleDoubleClick = () => {
    setIsFolderOpen((prev) => !prev)
  }

  const handleSubmitEditing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingId) return
    if (inputValue.trim() === '') return
    if (inputValue === 'Новый документ' || inputValue === 'Новая группа') {
      dispatch(setEditingId(null))
      return
    }
    if (inputValue === node.label) return
    dispatch(editTreeItem({ type: node.type, id: editingId, name: inputValue }))
    dispatch(setEditingId(null))
  }

  const handleCancelEditing = () => {
    if (!editingId) return
    setInputValue(node.label)
    dispatch(setEditingId(null))
  }

  useEffect(() => {
    if (inputRef.current && editingId === node.id) {
      inputRef.current.focus()
    }
  }, [editingId, node.id])

  const itemImage = getImage(node, isFolderOpen, 'w-6 h-6')
  return (
    <li>
      {editingId === node.id ? (
        <form
          onSubmit={(e) => handleSubmitEditing(e)}
          className={clsx(
            'flex gap-2 py-1 px-2 rounded-md cursor-pointer select-none transition-colors hover:bg-gray-400 dark:hover:bg-gray-700 ',
            node.type === 'group'
              ? 'text-gray-800 dark:text-gray-100'
              : 'text-cyan-900 dark:text-cyan-200',
            activeItem?.id === node.id && 'bg-slate-400 dark:bg-slate-800'
          )}
        >
          {itemImage}
          <input
            className='px-1 rounded-md bg-white dark:bg-black'
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type='text'
            placeholder='Введите название'
          />
          <button title='Сохранить' className='w-6 h-6 opacity-75' type='submit'><Check className='w-6 h-6' /></button>
          <button title='Отменить' className='w-6 h-6 opacity-75' onClick={handleCancelEditing}><Cancel className='w-6 h-6' /></button>
        </form>
      ) : (
        <>
          <div
            onClick={() => handleClick(node)}
            onDoubleClick={handleDoubleClick}
            onContextMenu={(e) => handleContextMenu(e, node)}
            className={clsx(
              'flex gap-2 py-1 px-2 rounded-md cursor-pointer select-none transition-colors hover:bg-gray-400 dark:hover:bg-gray-700 relative ',
              node.type === 'group'
                ? 'text-gray-800 dark:text-gray-100'
                : 'text-cyan-900 dark:text-cyan-200',
              activeItem?.id === node.id && 'bg-slate-400 dark:bg-slate-900'
            )}
          >
            {itemImage}
            {node.label}
            {activeItem?.id === node.id && (
              <button
                onClick={(e) => handleContextMenu(e, node)}
                className='absolute w-6 h-6 right-2 text-gray-500'
              >
                <Dots />
              </button>
            )}
          </div>
        </>
      )}
      {node.children && node.children.length > 0 && isFolderOpen && (
        <TreeUl nodes={node.children} handleContextMenu={handleContextMenu} />
      )}
    </li>
  )
}

export default TreeLi
