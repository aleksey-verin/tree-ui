import { DocumentsData, GroupData, TreeNode } from "@/store/reducers/types/treeDataTypes"

export function buildTree(groups: GroupData[], documents: DocumentsData[]): TreeNode[] {
  const groupMap: Map<string, TreeNode> = new Map(
    groups.map((group) => [group.id, { id: group.id, label: group.name, type: 'group', children: [], parentId: group.parentId }])
  )

  documents.forEach((doc) => {
    const group = groupMap.get(doc.groupId)
    if (group) {
      group.children?.push({
        id: doc.id,
        label: doc.name,
        type: 'document',
        children: [],
        parentId: doc.groupId
      })
    }
  })

  const tree: TreeNode[] = []
  groups.forEach((group) => {
    const item = groupMap.get(group.id)
    if (group.parentId === null && item) {
      tree.push(item)
    } else {
      if (group.parentId) {
        const parentGroup = groupMap.get(group.parentId)
        if (parentGroup && parentGroup.children && item) {
          parentGroup.children.push(item)
        }
      }
    }
  })

  return tree
}

export function findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
  for (let node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children && node.children.length) {
      let result = findNodeById(node.children, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
