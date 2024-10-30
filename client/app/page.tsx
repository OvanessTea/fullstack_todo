'use server'
import { TaskModel } from "./types/index";

const data: TaskModel[] = await fetch(`${process.env.BASE_URL}`)
  .then(async (res: Response) => { return await res.json(); });

export default async function Home() {
  const sendData = async() => {
    'use server'
    // fetch(`${process.env.BASE_URL}/task`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: 'Test',
    //     description: 'Long test',
    //     is_done: true,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // });
  };
  
  const deleteData = async(id: string) => {
    'use server'
    // fetch(`${process.env.BASE_URL}/task/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // });
  }

  return (
    <div>
      {data.map((elem: TaskModel) => (
        <div>
          <p className="App-intro">{elem.title}</p>
        </div>
      ))}
    </div>
  );
}