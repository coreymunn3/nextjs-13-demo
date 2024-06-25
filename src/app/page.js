import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/db";
import TodoItem from "@/components/TodoItem";

const getTodos = async () => {
  return prisma.todo.findMany();
};

const toggleTodo = async (id, complete) => {
  "use server";

  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      complete: complete,
    },
  });
};

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl"> Todos</h1>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none"
        >
          New Todo
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
