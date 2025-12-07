import { useNavigate } from "react-router";
import Search from "~/features/Search";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="
        flex-1 flex flex-col items-center 
        gap-8 sm:gap-16 
        min-h-0
      ">
        <h1 className="
          text-5xl sm:text-7xl
          font-extrabold tracking-tight 
          text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 
          dark:from-blue-400 dark:to-cyan-300 
          drop-shadow-sm 
          pb-1
        ">
          CragForecast
        </h1>
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
