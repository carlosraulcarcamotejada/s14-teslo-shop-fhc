import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex justify-center items-center w-full">{children}</div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width={100}
          height={100}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
