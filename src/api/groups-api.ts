import { dbClient } from '@/libs/db'
import { cache } from 'react'

class groupsApi {
  getGroups = cache((): Promise<GroupElement[]> => dbClient.group.findMany())

  createGroup = cache((command: CreateGroupElementCommand): Promise<GroupElement> => {
    return dbClient.group.create({
      data: command,
    })
  })
  deleteGroup = cache((command: DeleteGroupElementCommand) => {
    return dbClient.group.delete({
      where: { id: command.id },
    })
  })
}

export const groupsApiClient = new groupsApi()
