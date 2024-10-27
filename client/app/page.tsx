import Image from "next/image";

export default async function Home () {
  const data: {apiResponse: string} = await fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(res => { return { apiResponse: res } });

  return (
    <div>
      <p className="App-intro">;{data.apiResponse}</p>
    </div>
  );
}
