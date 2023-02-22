import { useAppStore } from "@/lib/store/app";
import ExpressionInput from "./ExpressionInput";

interface Props {
  id: string;
}
export default function ArcadeObject({ id }: Props) {
  const { objects, updateObject } = useAppStore((state) => ({
    objects: state.objects,
    updateObject: state.updateObject,
  }));
  const data = objects[id];

  function updateStore(expr: string) {
    updateObject(id, "v", { ...data.v, expr });
  }

  return (
    <div
      className="absolute"
      style={{
        top: data.y! * 30 + "px",
        left: data.x! * 30 + "px",
      }}
    >
      <ExpressionInput {...data.v} updateStore={updateStore} />
    </div>
  );
}
