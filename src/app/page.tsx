import { PlateEditor } from "@/components/ui/editor/plate-editor";

export default function HomePage() {
  return (
    <main className="grid min-h-screen">
      <PlateEditor className={{ scrollArea: "max-h-full", editorContainer: "mt-auto h-fit max-h-screen" }} />
    </main>
  );
}
