import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <span className="flex justify-center items-center w-full gap-2">
        <h1 className="text-5xl font-bold">SideProjects.fun</h1>
        <Image
          src={"/assets/swords.png"}
          alt="swords_image"
          width={100}
          height={100}
        />
      </span>
    </div>
  );
}
