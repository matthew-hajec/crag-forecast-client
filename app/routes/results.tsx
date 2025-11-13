import type {Route} from "./+types/home";
import ResultsPage from "../pages/Results";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CragForecast | Results" },
    { name: "description", content: "CragForecast Results Page" },
  ];
}

export default function Results() {
  return <ResultsPage />;
}