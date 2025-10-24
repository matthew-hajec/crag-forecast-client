import { useNavigate } from "react-router";
import logo from "~/assets/logo.png";
import { Search } from "~/components/search";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logo}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logo}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[600px] w-full space-y-6 px-4">
          <Search
            onSearch={({ latitude, longitude, radius }) => {
              // Go to /search?latitude=...&longitude=...&radius=...
              navigate(
                `/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
              );
            }}
          />
        </div>
      </div>
    </main>
  );
}
