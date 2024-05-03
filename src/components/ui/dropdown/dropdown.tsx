'use client'
import { useState } from 'react'
import AddFile from '../icons/add-file'
import AddFolder from '../icons/add-folder'
import Delete from '../icons/delete'
import Edit from '../icons/edit'
import { TreeNode } from '@/libs/libs'

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
}: {
  points: { x: number; y: number }
  item: TreeNode | null
  addDocument: () => void
  addGroup: () => void
  editItem: () => void
  deleteItem: () => void
}) => {
  return (
    <div
      style={{ top: `${points.y - 25}px`, left: `${points.x - 20}px` }}
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
      {(item?.type === 'group' && item?.parentId === null) ? null : (
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
