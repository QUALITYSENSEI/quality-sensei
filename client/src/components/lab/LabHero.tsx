import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Award } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useTheme } from "@/contexts/ThemeContext";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface LabHeroProps {
  title: string;
  icon: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  studentCount?: number;
  certificateAvailable?: boolean;
}

export default function LabHero({
  title,
  icon,
  breadcrumbs,
  studentCount = 0,
  certificateAvailable = false
}: LabHeroProps) {
  const { theme } = useTheme();

  return (
    <div className="mb-8">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className={cn(
            "text-3xl font-bold mt-4 mb-2 flex items-center",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            <span className={cn(
              "mr-2",
              theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
            )}>
              {icon}
            </span>
            {title}
          </h1>
          <div className="flex items-center gap-2">
            {studentCount > 0 && (
              <Badge variant="secondary">
                <User className="w-3 h-3 mr-1" />
                {studentCount.toLocaleString()} students
              </Badge>
            )}
            {certificateAvailable && (
              <Badge variant="outline">
                <Award className="w-3 h-3 mr-1" />
                Certificate Available
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}