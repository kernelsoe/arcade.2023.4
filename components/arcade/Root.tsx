import { useControls } from "@/lib/leva";

export default function Root() {
  const values = useControls({
    radius: 3,
  });
  return <div>{JSON.stringify(values)}</div>;
}
