import { getToday } from "@/lib/today";
import Stage from "@/stage/Stage";

export default async function Page() {
  const today = await getToday();
  return <Stage today={today} />;
}
