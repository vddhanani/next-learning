import PropsExample from "../components/PropsExample";
import PublicImageExample  from "../components/PublicImageExample";
import Link from "next/link";
// function Welcome({ title,description }: { description: string; title: string;}) {
//   return (
//     <section>
//       <h1>{title}</h1>
//       <p>{description}</p>
//     </section>
//   );
// }

// export default function Home() {
//   return (
//     <main>
//       <Welcome
//         title="My First Next.js Page"
//         description="I am learning Next.js."
//       />

//     </main>
//   );
// }


export default function Home() {
  const examples = [
    {
      title: "My First Next.js Page",
      description: "I am learning Next.js.",
    },
    {
      title: "Reusable Components",
      description: "This component can show different content.",
    },
  ];

 return (
    <main className="page-content">
      {/* <Link href="/about">About page</Link> */}
      <PublicImageExample />
      <h1>My Learning Demo</h1>

     {examples.map((example) => (
        <PropsExample
          key={example.title}
          title={example.title}
          description={example.description}
        />
      ))}

    </main>
  );
}
