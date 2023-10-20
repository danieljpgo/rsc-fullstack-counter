import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { Timer } from "./Timer";

export default async function Home() {
  const counter = (await fs.readFile("./counter.txt")).toString();

  return (
    <main>
      <Timer />
      <form action={UpdateCounter}>
        Counter: <button type="submit">{counter}</button>
      </form>
    </main>
  );
}

async function UpdateCounter() {
  "use server";

  const counter = (await fs.readFile("./counter.txt")).toString();
  await fs.writeFile("./counter.txt", `${parseInt(counter) + 1}`);
  revalidatePath("/");
}
