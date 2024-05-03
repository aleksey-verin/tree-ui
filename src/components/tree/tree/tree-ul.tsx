import { TreeNode } from '../../../libs/libs'
import TreeLi from './tree-li'

const TreeUl = ({
  nodes,
  activeItem,
  // isEditing,
  handleActiveItem,
  handleContextMenu,
  // editingItem,
  // setEditingItem
}: {
  nodes: TreeNode[]
  activeItem: TreeNode | null
  // isEditing: boolean
  handleActiveItem: (item: TreeNode) => void
  handleContextMenu: (e: React.MouseEvent<HTMLElement>, item: TreeNode) => void
  // editingItem: string
  // setEditingItem: () => void
}) => {
  return (
    <ul className='pl-4'>
      {nodes.map((node) => (
        <TreeLi
          key={node.id}
          node={node}
          activeItem={activeItem}
          // isEditing={isEditing}
          handleActiveItem={handleActiveItem}
          handleContextMenu={handleContextMenu}
          // editingItem={editingItem}
          // setEditingItem={setEditingItem}
        />
      ))}
    </ul>
  )
}

export default TreeUl
