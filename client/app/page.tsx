import { ToDo } from "@/schemas/todo.schema";

export default async function Home () {
  const data: ToDo[] = await fetch("http://localhost:9000/")
    .then(async (res: Response) => { return await res.json() })
  return (
    <div>
      {data.map((elem: ToDo) => (
        <p className="App-intro">{elem.title}</p>
      ))}
    </div>
  );
}
