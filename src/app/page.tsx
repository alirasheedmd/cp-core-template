import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-Orange text-4xl font-bold">Hello World</h1>
      <Link
        href="/admin"
        className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
      >
        Go to Admin
      </Link>
    </div>
  );
}
