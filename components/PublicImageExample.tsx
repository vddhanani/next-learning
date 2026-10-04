import Image from "next/image";

export default function PublicImageExample() {
  return (
    <Image
      src="/next.svg"
      alt="Next.js logo"
      width={100}
      height={20}
    />
  );
}