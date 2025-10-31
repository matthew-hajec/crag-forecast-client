import type {Route} from "./+types/home";
import {SearchPage} from "../pages/search";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CragFinder | Results" },
    { name: "description", content: "CragFinder Results Page" },
  ];
}

export default function Search() {
  return <SearchPage />;
}