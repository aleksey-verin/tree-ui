export interface GroupData {
  id: string
  parentId: string | null
  name: string
}

export interface DocumentsData {
  id: string
  groupId: string
  name: string
}

export type TreeItemType = 'group' | 'document'

export interface TreeNode {
  id: string
  label: string
  type: TreeItemType
  children?: TreeNode[]
  parentId: string | null
}