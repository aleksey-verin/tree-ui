import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import { getGroupsData } from '@/api/get-groups-data'
import { buildTree, findNodeById, TreeItemType, TreeNode } from '@/libs/libs'
import { getDocumentsData } from '@/api/get-documents-data'
import { DocumentsData, GroupData } from '@/data/data'

interface initialStateTypes {
  data: {
    groups: GroupData[]
    documents: DocumentsData[]
  }
  treeData: TreeNode[]
  activeItem: TreeNode | null
  editingId: string | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState = {
  data: {
    groups: [],
    documents: [],
  },
  treeData: [],
  activeItem: null,
  editingId: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
}

export const getInitialTreeData = createAsyncThunk<
  { groups: GroupData[]; documents: DocumentsData[] },
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('getTreeData', async (_, thunkAPI) => {
  try {
    const [groups, documents] = await Promise.all([getGroupsData(), getDocumentsData()])
    // const data = buildTree(groups, documents)
    return { groups, documents }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteTreeItem = createAsyncThunk<
  { newData: GroupData[] | DocumentsData[]; type: TreeItemType },
  { id: string; type: TreeItemType },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('deleteTreeItem', async ({ id, type }, thunkAPI) => {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 500)) // Delay
    if (type === 'group') {
      const prevData = thunkAPI.getState().treeDataSlice.data.groups
      const newData = prevData.filter((item) => item.id !== id)
      return { newData, type }
    } else {
      const prevData = thunkAPI.getState().treeDataSlice.data.documents
      const newData = prevData.filter((item) => item.id !== id)
      return { newData, type }
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const addTreeItem = createAsyncThunk<
  { newData: GroupData[] | DocumentsData[]; type: TreeItemType, newId: string },
  { type: TreeItemType, parentOrGroupId: string, name: string },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('addTreeItem', async ({ type, parentOrGroupId, name }, thunkAPI) => {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 500)) // Delay
    const newId = Date.now().toString()
    if (type === 'group') {
      const prevData = thunkAPI.getState().treeDataSlice.data.groups
      const newData = [...prevData, { id: newId, name, parentId: parentOrGroupId }]
      return { newData, type, newId }
    } else {
      const prevData = thunkAPI.getState().treeDataSlice.data.documents
      const newData = [...prevData, { id: newId, name, groupId: parentOrGroupId }]
      return { newData, type, newId }
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const editTreeItem = createAsyncThunk<
  { newData: GroupData[] | DocumentsData[]; type: TreeItemType },
  { type: TreeItemType, id: string, name: string },
  {
    dispatch: AppDispatch
    state: RootState
  }
>('editTreeItem', async ({ type, id, name }, thunkAPI) => {
  try {
    await new Promise<void>((resolve) => setTimeout(resolve, 500)) // Delay
    if (type === 'group') {
      const prevData = thunkAPI.getState().treeDataSlice.data.groups
      const newData = prevData.map((item) => (item.id === id ? { ...item, name } : item))
      return { newData, type }
    } else {
      const prevData = thunkAPI.getState().treeDataSlice.data.documents
      const newData = prevData.map((item) => (item.id === id ? { ...item, name } : item))
      return { newData, type }
    }
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const treeDataSlice = createSlice({
  name: 'treeDataSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setEditingId: (state, { payload }: PayloadAction<string | null>) => {
      state.editingId = payload
    },
    setActiveItem: (state, { payload }: PayloadAction<TreeNode>) => {
      state.activeItem = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialTreeData.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      getInitialTreeData.fulfilled,
      (state, { payload }: PayloadAction<{ groups: GroupData[]; documents: DocumentsData[] }>) => {
        state.data.documents = payload.documents
        state.data.groups = payload.groups
        state.treeData = buildTree(state.data.groups, state.data.documents)
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(getInitialTreeData.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(deleteTreeItem.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      deleteTreeItem.fulfilled,
      (state, { payload }: PayloadAction<{ newData: GroupData[] | DocumentsData[]; type: TreeItemType }>) => {
        if (payload.type === 'group') {
          state.data.groups = payload.newData as GroupData[]
          state.treeData = buildTree(payload.newData as GroupData[], state.data.documents)
        } else {
          state.data.documents = payload.newData as DocumentsData[]
          state.treeData = buildTree(state.data.groups, payload.newData as DocumentsData[])
        }
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(deleteTreeItem.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(addTreeItem.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      addTreeItem.fulfilled,
      (state, { payload }: PayloadAction<{ newData: GroupData[] | DocumentsData[]; type: TreeItemType; newId: string }>) => {
        
        let newTree: TreeNode[] = []
        if (payload.type === 'group') {
          state.data.groups = payload.newData as GroupData[]
          newTree = buildTree(payload.newData as GroupData[], state.data.documents)
          state.treeData = newTree
        } else {
          state.data.documents = payload.newData as DocumentsData[]
          newTree = buildTree(state.data.groups, payload.newData as DocumentsData[])
          state.treeData = newTree
        }
        state.editingId = payload.newId
        state.activeItem = findNodeById(newTree, payload.newId)
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(addTreeItem.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
    builder.addCase(editTreeItem.pending, (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    })
    builder.addCase(
      editTreeItem.fulfilled,
      (state, { payload }: PayloadAction<{ newData: GroupData[] | DocumentsData[]; type: TreeItemType }>) => {
        if (payload.type === 'group') {
          state.data.groups = payload.newData as GroupData[]
          state.treeData = buildTree(payload.newData as GroupData[], state.data.documents)
        } else {
          state.data.documents = payload.newData as DocumentsData[]
          state.treeData = buildTree(state.data.groups, payload.newData as DocumentsData[])
        }
        state.isLoading = false
        state.isSuccess = true
      }
    )
    builder.addCase(editTreeItem.rejected, (state) => {
      state.isLoading = false
      state.isError = true
    })
  },
})

export const selectorTreeDataSlice = (state: RootState) => state.treeDataSlice
export const { setEditingId, setActiveItem } = treeDataSlice.actions;
export default treeDataSlice.reducer
