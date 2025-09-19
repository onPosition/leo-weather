import Image from "next/image";

type AppHeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export default function AppHeader({ isMenuOpen, setIsMenuOpen }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-end p-4">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image src={"/menu.svg"} alt="Burger menu" width={24} height={24} />
      </button>
    </header>
  );
}

