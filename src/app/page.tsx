import { PlateEditor } from "@/components/ui/editor/plate-editor";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomePage() {
  return (
    <main className="p-6 grid grid-rows-[1fr_auto] min-h-screen ">
      <div />
      <ScrollArea className="max-h-[250px] border-t">
        <PlateEditor />
      </ScrollArea>
    </main>
  );
}
