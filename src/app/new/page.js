import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

const createTodo = async (data) => {
  "use server";

  const title = data.get("title");
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({
    data: {
      title: title,
      complete: false,
    },
  });

  redirect("/");
};

export default async function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl"> New Todo </h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:border-slate-200"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:border-slate-200 hover:bg-slate-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none hover:border-slate-200 hover:bg-slate-700"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
