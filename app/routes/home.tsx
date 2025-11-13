import type { Route } from "./+types/home";
import { Welcome } from "../pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CragForecast | Home" },
    { name: "description", content: "CragForecast Home" },
  ];
}

export default function Home() {
  return <Welcome />;
}
