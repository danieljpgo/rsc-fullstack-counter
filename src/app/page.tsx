import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const counter = (await fs.readFile("./counter.txt")).toString();

  return (
    <form action={UpdateCounter}>
      <button type="submit">{counter}</button>
    </form>
  );
}

async function UpdateCounter() {
  "use server";

  const counter = (await fs.readFile("./counter.txt")).toString();
  await fs.writeFile("./counter.txt", `${parseInt(counter) + 1}`);
  revalidatePath("/");
}
