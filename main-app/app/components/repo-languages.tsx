import { Badge } from "@/components/ui/badge";

export function RepositoryLanguages({ languages }: { languages: { name: string }[] }) {
  console.log(languages)
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {languages.map((lang) => (
        <Badge key={lang.name} variant="outline">
          {lang.name}
        </Badge>
      ))}
    </div>
  );
}
