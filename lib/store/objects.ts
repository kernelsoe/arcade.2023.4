import produce from "immer";
import { StateCreator } from "zustand";
import { AppStoreSlice } from "./app";

export interface NotationObject {
  id: string;
  x?: number;
  y?: number;
  d: any[]; // data = prose editor schema
}
// export type ArcadeObject = Notation;
// export interface Notation extends BaseObject {
//   type: "notation";
// }
export interface Stack {
  id: string;
  x: number;
  y: number;
  d: any[]; // data = child nodes
}

export type ArcadeObject = Stack | NotationObject;

export interface ObjectStoreSlice {
  rootIds: string[];
  setObjectIds: (rootIds: string[]) => void;
  pushObjectId: (object: string) => void;
  objects: Record<string, ArcadeObject>;
  setObjects: (objects: ArcadeObject[]) => void;
  insertObject: (object: ArcadeObject) => void;
  updateObject: (
    id: string,
    k: keyof ArcadeObject,
    value: string | number | any[],
  ) => void;
  deleteObject: (id: string) => void;
  currentObjectId: string | undefined;
  setCurrentObjectId: (id: string | undefined) => void;
}

export const createObjectSlice: StateCreator<
  AppStoreSlice & ObjectStoreSlice,
  [],
  [],
  ObjectStoreSlice
> = (set) => ({
  rootIds: [],
  setObjectIds: (rootIds) => set((state) => ({ rootIds })),
  pushObjectId: (object) =>
    set((state) => ({ rootIds: [...state.rootIds, object] })),
  objects: {},
  setObjects: (objectsList) =>
    set(
      produce((draft: ObjectStoreSlice) => {
        const data: Record<string, ArcadeObject> = {};

        for (let object of objectsList) {
          data[object.id] = object;
        }

        draft.objects = data;
      }),
    ),
  insertObject: (object) =>
    set(
      produce((draft: ObjectStoreSlice) => {
        draft.objects[object.id] = object;
      }),
    ),
  updateObject: (id, k, v) =>
    set(
      produce((draft: ObjectStoreSlice) => {
        // @ts-ignore
        draft.objects[id][k] = v;
      }),
    ),
  deleteObject: (objectId) =>
    set(
      produce((draft: ObjectStoreSlice) => {
        const index = draft.rootIds.findIndex((objId) => objId === objectId);
        draft.rootIds.splice(index, 1);
        delete draft.objects[objectId];
        draft.currentObjectId = undefined;
      }),
    ),
  currentObjectId: "undefined",
  setCurrentObjectId: (currentObjectId) => set(() => ({ currentObjectId })),
});
