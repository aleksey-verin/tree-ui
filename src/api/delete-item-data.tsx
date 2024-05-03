import { GroupData, groupsData } from '@/data/data'
import { TreeItemType } from '@/libs/libs';


export async function deleteItemData(id: string, type: TreeItemType): Promise<GroupData[]> {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000)); // Delay
    const groups: GroupData[] = groupsData;
    return groups;
  } catch (error) {
    throw new Error(error as string);
  }
}
