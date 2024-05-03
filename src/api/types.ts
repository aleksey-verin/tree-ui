type GroupElement = {
  id: string
  parentId: string | null
  name: string
}

type CreateGroupElementCommand = {
  name: string
  parentId: string | null
}

type DeleteGroupElementCommand = {
  id: string
}

type EditGroupElementCommand = {
  id: string
  name: string
}
