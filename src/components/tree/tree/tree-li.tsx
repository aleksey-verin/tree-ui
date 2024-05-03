'use client'
import { TreeNode } from '../../../libs/libs'
import { useEffect, useRef, useState } from 'react'
import TreeUl from './tree-ul'
import clsx from 'clsx'
import FolderFullClosed from '@/components/ui/icons/folder-full-closed'
import FolderFullOpened from '@/components/ui/icons/folder-full-opened'
import FolderEmptyClosed from '@/components/ui/icons/folder-empty-closed'
import File from '@/components/ui/icons/file'
import { useAppDispatch, useAppSelector } from '@/libs/hooks'
import { editTreeItem, selectorTreeDataSlice, setEditingId } from '@/store/reducers/treeDataSlice'

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
  activeItem,
  handleActiveItem,
  handleContextMenu,
}: {
  node: TreeNode
  activeItem: TreeNode | null
  handleActiveItem: (item: TreeNode) => void
  handleContextMenu: (e: React.MouseEvent<HTMLElement>, item: TreeNode) => void
}) => {
  const [isFolderOpen, setIsFolderOpen] = useState(true)
  const { editingId } = useAppSelector(selectorTreeDataSlice)
  const [inputValue, setInputValue] = useState(node.label)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = (item: TreeNode) => {
    if (item.id === activeItem?.id) return
    handleActiveItem(item)
  }

  const handleDoubleClick = () => {
    setIsFolderOpen((prev) => !prev)
  }

  const handleSubmitEditing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingId) return
    if (inputValue.trim() === '') return
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
              ? 'text-gray-800 dark:text-gray-100 font-normal'
              : 'text-cyan-900 dark:text-cyan-200 font-semibold',
            activeItem?.id === node.id && 'bg-slate-400 dark:bg-slate-900'
          )}
        >
          {itemImage}
          <input
            className='px-1 rounded-md'
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type='text'
            placeholder='Введите название'
          />
          <button type='submit'>Сохранить</button>
          <button onClick={handleCancelEditing}>Отменить</button>
        </form>
      ) : (
        <div
          onClick={() => handleClick(node)}
          onDoubleClick={handleDoubleClick}
          onContextMenu={(e) => handleContextMenu(e, node)}
          className={clsx(
            'flex gap-2 py-1 px-2 rounded-md cursor-pointer select-none transition-colors hover:bg-gray-400 dark:hover:bg-gray-700 ',
            node.type === 'group'
              ? 'text-gray-800 dark:text-gray-100 font-normal'
              : 'text-cyan-900 dark:text-cyan-200 font-semibold',
            activeItem?.id === node.id && 'bg-slate-400 dark:bg-slate-900'
          )}
        >
          {itemImage}
          {node.label}
        </div>
      )}
      {node.children && node.children.length > 0 && isFolderOpen && (
        <TreeUl
          nodes={node.children}
          activeItem={activeItem}
          handleActiveItem={handleActiveItem}
          handleContextMenu={handleContextMenu}
        />
      )}
    </li>
  )
}

export default TreeLi