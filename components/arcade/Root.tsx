import { useAppStore } from "@/lib/store/app";
import { useEffect } from "react";

export default function Root() {
  const {
    rootIds,
    objects,
    editorRefs,
    setObjectIds,
    pushObjectId,
    setObjects,
    deleteObject,
    currentObjectId,
    currentFocus,
  } = useAppStore((state) => ({
    rootIds: state.rootIds,
    objects: state.objects,
    editorRefs: state.editorRefs,
    setObjectIds: state.setObjectIds,
    pushObjectId: state.pushObjectId,
    setObjects: state.setObjects,
    deleteObject: state.deleteObject,
    currentObjectId: state.currentObjectId,
    currentFocus: state.currentFocus,
  }));

  useEffect(() => {
    console.log("Launch!");
    setObjects([
      {
        x: 0,
        y: 0,
        d: [
          {
            type: "expr",
            i: 99,
          },
        ],
        id: "1",
      },
      {
        x: 6,
        y: 6,
        d: [
          {
            type: "expr",
            notation: "range[1, 10]",
            f: "range",
            i: [1, 10],
            o: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          },
        ],
        id: "2",
      },
      {
        x: 6,
        y: 9,
        d: [
          {
            type: "expr",
            notation: "map[0, 1]",
            f: "map",
            i: {
              // Inputs are subscription to other nodes
              0: "n:2",
              1: "n:4",
            }, // input is [list node id, expression node id]
            o: "",
          },
        ],
        id: "3",
      },
      {
        x: 12,
        y: 12,
        d: [
          {
            type: "expr",
            notation: "x * 3",
            f: "*",
            i: {
              x: "", // input is not yet linked! just "x"
            },
            o: "",
          },
        ],
        id: "4",
      },
    ]);
    setObjectIds(["1", "2", "3", "4"]);
  }, [setObjectIds, setObjects]);

  return <div></div>;
}
