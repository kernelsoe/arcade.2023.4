import { miniMAL } from "@/lib/engine";
import { useAppStore } from "@/lib/store/app";
import { useEffect } from "react";
import ArcadeObject from "./ArcadeObject";

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
        x: 3,
        y: 3,
        v: {
          expr: "99",
        },
        id: "1",
      },
      {
        x: 6,
        y: 6,
        v: {
          expr: "[range, 1, 10]",
          f: "range",
          i: [1, 10],
          o: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        id: "2",
      },
      {
        x: 6,
        y: 9,
        v: {
          expr: "[map, 0, 1]",
          f: "map",
          i: {
            // Inputs are subscription to other nodes
            0: "n:2",
            1: "n:4",
          }, // input is [list node id, expression node id]
          o: "",
        },
        id: "3",
      },
      {
        x: 12,
        y: 12,
        v: {
          expr: "[*, x, 3]",
          f: "*",
          i: {
            x: "", // input is not yet linked! just "x"
          },
          o: "",
        },
        id: "4",
      },
      {
        x: 20,
        y: 12,
        v: {
          expr: "[circle, 0, 0, 10]",
          f: "*",
          i: {
            x: "", // input is not yet linked! just "x"
          },
          o: "",
        },
        id: "5",
      },
      {
        x: 20,
        y: 14,
        v: {
          expr: "[rectangle, 0, 0, 30, 60]",
          f: "*",
          i: {
            x: "", // input is not yet linked! just "x"
          },
          o: "",
        },
        id: "6",
      },
    ]);
    setObjectIds(["1", "2", "3", "4", "5", "6"]);

    // const m = miniMAL({ xxx: 123 });
    // console.log(m.eval(["+", 2, 3]));
    // m.eval(["def", "x", 123]);
    // console.log(m.eval(["*", "xxx", 5]));
    // console.log(
    //   m.eval([["fn", ["a", "b"], ["*", 2, ["+", "a", "b"]]], "xxx", 99]),
    // );
    // m.eval(["def", "incr", ["fn", ["a"], ["+", 2, "a"]]]);
    // console.log(m.eval(["incr", 9]));
    // console.log(m.eval(["let", ["y", 456], ["*", "x", "y"]]));
  }, [setObjectIds, setObjects]);

  return (
    <div>
      {rootIds.map((id) => (
        <ArcadeObject key={id} id={id} />
      ))}
    </div>
  );
}
