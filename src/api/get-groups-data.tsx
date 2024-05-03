import { GroupData, groupsData } from '@/data/data'


export async function getGroupsData(): Promise<GroupData[]> {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 500)); // Delay
    const groups: GroupData[] = groupsData;
    return groups;
  } catch (error) {
    throw new Error(error as string);
  }
}
