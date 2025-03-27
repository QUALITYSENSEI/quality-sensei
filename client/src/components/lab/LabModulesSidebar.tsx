import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "@/components/ui/badge";

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  completionRate: number;
  skills: string[];
  languages: string[];
  prerequisites?: string[];
  badgeText?: string;
}

interface LabModulesSidebarProps {
  modules: Module[];
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

export default function LabModulesSidebar({
  modules,
  activeModule,
  onModuleChange
}: LabModulesSidebarProps) {
  const { theme } = useTheme();

  const getColorByDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-emerald-500 text-white';
      case 'intermediate':
        return 'bg-amber-500 text-white';
      case 'advanced':
        return 'bg-rose-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={cn(
      "p-4 rounded-lg sticky top-20",
      theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
    )}>
      <h2 className={cn(
        "text-lg font-medium mb-4",
        theme === "dark" ? "text-white" : "text-gray-900"
      )}>Modules</h2>
      
      <div className="space-y-3">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-colors flex items-start space-x-3",
              activeModule === module.id
                ? theme === "dark" 
                  ? "bg-gray-700 shadow-sm" 
                  : "bg-gray-100 shadow-sm"
                : "hover:bg-gray-700/10",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            <div className={cn(
              "mt-0.5 flex-shrink-0 p-1.5 rounded-md",
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            )}>
              {module.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{module.title}</h3>
                {module.badgeText && (
                  <Badge variant="outline" className="ml-2">
                    {module.badgeText}
                  </Badge>
                )}
              </div>
              
              <p className={cn(
                "text-sm mt-1",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}>
                {module.description}
              </p>
              
              <div className="flex items-center mt-2 space-x-2">
                <div className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  getColorByDifficulty(module.difficulty)
                )}>
                  {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                </div>
                
                <span className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  {module.duration}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}