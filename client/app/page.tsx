'use server'
import Tasks from "./task/page";

export default async function Home() {
  return (
    <Tasks />
  );
}