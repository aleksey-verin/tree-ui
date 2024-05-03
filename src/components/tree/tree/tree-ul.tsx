import { useAppSelector } from '@/libs/hooks'
import TreeLi from './tree-li'
import { selectorTreeDataSlice } from '@/store/reducers/treeDataSlice'
import { TreeNode } from '@/store/reducers/types/treeDataTypes'

const TreeUl = ({
  nodes,
  handleContextMenu,
}: {
  nodes: TreeNode[]
  handleContextMenu: (e: React.MouseEvent<HTMLElement>, item: TreeNode) => void
}) => {

  const { treeData } = useAppSelector(selectorTreeDataSlice)


  return (
    <ul className='pl-2 lg:pl-4'>
      {nodes.map((node) => (
        <TreeLi
          key={node.id}
          node={node}
          handleContextMenu={handleContextMenu}
        />
      ))}
    </ul>
  )
}

export default TreeUl
