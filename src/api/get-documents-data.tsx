import { documentsData } from "@/data/data";
import { DocumentsData } from "@/store/reducers/types/treeDataTypes";

export async function getDocumentsData(): Promise<DocumentsData[]> {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 500)); // Delay
    const groups: DocumentsData[] = documentsData;
    return groups;
  } catch (error) {
    throw new Error(error as string);
  }
}
