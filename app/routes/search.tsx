import type {Route} from "./+types/home";
import {SearchPage} from "../pages/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CragForecast | Results" },
    { name: "description", content: "CragForecast Results Page" },
  ];
}

export default function Search() {
  return <SearchPage />;
}