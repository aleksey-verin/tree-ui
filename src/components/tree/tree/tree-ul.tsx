import { useAppSelector } from '@/libs/hooks'
import { TreeNode } from '../../../libs/libs'
import TreeLi from './tree-li'
import { selectorTreeDataSlice } from '@/store/reducers/treeDataSlice'

const TreeUl = ({
  nodes,
  handleContextMenu,
}: {
  nodes: TreeNode[]
  handleContextMenu: (e: React.MouseEvent<HTMLElement>, item: TreeNode) => void
}) => {

  const { treeData } = useAppSelector(selectorTreeDataSlice)


  return (
    <ul className='pl-4'>
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
