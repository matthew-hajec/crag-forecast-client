import type { Route } from "./+types/home";
import { Welcome } from "../pages/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CragFinder | Home" },
    { name: "description", content: "CragFinder Home" },
  ];
}

export default function Home() {
  return <Welcome />;
}
